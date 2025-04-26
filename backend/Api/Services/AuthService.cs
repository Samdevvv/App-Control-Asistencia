using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DefensoriaAsistencia.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IUsuarioRepository usuarioRepository, IConfiguration configuration)
        {
            _usuarioRepository = usuarioRepository;
            _configuration = configuration;
        }

        public async Task<ApiResponse<AuthResponseDTO>> LoginAsync(LoginDTO loginDto)
        {
            try
            {
                var usuario = await _usuarioRepository.AuthenticateAsync(loginDto.NombreUsuario, loginDto.Contrasena);

                if (usuario == null)
                {
                    return ApiResponse<AuthResponseDTO>.Fail("Credenciales inválidas. Usuario o contraseña incorrectos.");
                }

                if (!usuario.Estado)
                {
                    return ApiResponse<AuthResponseDTO>.Fail("La cuenta de usuario está desactivada.");
                }

                // Actualizar el último acceso
                await _usuarioRepository.ActualizarUltimoAccesoAsync(usuario.UsuarioID);

                // Generar token JWT
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, usuario.UsuarioID.ToString()),
                    new Claim(ClaimTypes.Name, usuario.NombreUsuario),
                    new Claim(ClaimTypes.GivenName, $"{usuario.Nombre} {usuario.Apellido}"),
                    new Claim(ClaimTypes.Email, usuario.Email ?? string.Empty),
                    new Claim(ClaimTypes.Role, usuario.Rol?.Nombre ?? ""),
                    new Claim("SucursalID", usuario.SucursalID.ToString()),
                    new Claim("Sucursal", usuario.Sucursal?.Nombre ?? "")
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? string.Empty));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var expiration = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:DurationInMinutes"] ?? "120"));

                var token = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Audience"],
                    claims: claims,
                    expires: expiration,
                    signingCredentials: creds
                );

                var authResponse = new AuthResponseDTO
                {
                    UsuarioID = usuario.UsuarioID,
                    NombreUsuario = usuario.NombreUsuario,
                    NombreCompleto = $"{usuario.Nombre} {usuario.Apellido}",
                    Email = usuario.Email,
                    Rol = usuario.Rol?.Nombre ?? "",
                    Sucursal = usuario.Sucursal?.Nombre ?? "",
                    Token = new JwtSecurityTokenHandler().WriteToken(token),
                    Expiracion = expiration
                };

                return ApiResponse<AuthResponseDTO>.Ok(authResponse, "Inicio de sesión exitoso");
            }
            catch (Exception ex)
            {
                return ApiResponse<AuthResponseDTO>.Fail($"Error en el inicio de sesión: {ex.Message}");
            }
        }
    }
}