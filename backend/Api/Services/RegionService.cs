using AutoMapper;
using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Interfaces;
using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Services
{
    public class RegionService : IRegionService
    {
        private readonly IRegionRepository _regionRepository;
        private readonly IMapper _mapper;

        public RegionService(IRegionRepository regionRepository, IMapper mapper)
        {
            _regionRepository = regionRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponse<IEnumerable<RegionDTO>>> GetAllRegionesAsync()
        {
            try
            {
                var regiones = await _regionRepository.GetAsync(r => r.Estado);
                var regionesDto = _mapper.Map<IEnumerable<RegionDTO>>(regiones);

                return ApiResponse<IEnumerable<RegionDTO>>.Ok(regionesDto);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<RegionDTO>>.Fail($"Error al obtener las regiones: {ex.Message}");
            }
        }

        public async Task<ApiResponse<RegionDTO>> GetRegionByIdAsync(int id)
        {
            try
            {
                var region = await _regionRepository.GetByIdAsync(id);

                if (region == null || !region.Estado)
                {
                    return ApiResponse<RegionDTO>.Fail("La región no existe o está inactiva.");
                }

                var regionDto = _mapper.Map<RegionDTO>(region);

                return ApiResponse<RegionDTO>.Ok(regionDto);
            }
            catch (Exception ex)
            {
                return ApiResponse<RegionDTO>.Fail($"Error al obtener la región: {ex.Message}");
            }
        }

        public async Task<ApiResponse<RegionDTO>> CreateRegionAsync(RegionCreateDTO regionDto)
        {
            try
            {
                // Verificar que no exista otra región con el mismo nombre
                if (await _regionRepository.ExisteNombreAsync(regionDto.Nombre))
                {
                    return ApiResponse<RegionDTO>.Fail("Ya existe una región con ese nombre.");
                }

                var region = _mapper.Map<Region>(regionDto);
                region.Estado = true;

                var regionCreada = await _regionRepository.AddAsync(region);
                var regionCreadaDto = _mapper.Map<RegionDTO>(regionCreada);

                return ApiResponse<RegionDTO>.Ok(regionCreadaDto, "Región creada exitosamente.");
            }
            catch (Exception ex)
            {
                return ApiResponse<RegionDTO>.Fail($"Error al crear la región: {ex.Message}");
            }
        }

        public async Task<ApiResponse<RegionDTO>> UpdateRegionAsync(RegionUpdateDTO regionDto)
        {
            try
            {
                var regionExistente = await _regionRepository.GetByIdAsync(regionDto.RegionID);

                if (regionExistente == null || !regionExistente.Estado)
                {
                    return ApiResponse<RegionDTO>.Fail("La región no existe o está inactiva.");
                }

                // Verificar que no exista otra región con el mismo nombre
                if (await _regionRepository.ExisteNombreAsync(regionDto.Nombre, regionDto.RegionID))
                {
                    return ApiResponse<RegionDTO>.Fail("Ya existe otra región con ese nombre.");
                }

                _mapper.Map(regionDto, regionExistente);

                var regionActualizada = await _regionRepository.UpdateAsync(regionExistente);
                var regionActualizadaDto = _mapper.Map<RegionDTO>(regionActualizada);

                return ApiResponse<RegionDTO>.Ok(regionActualizadaDto, "Región actualizada exitosamente.");
            }
            catch (Exception ex)
            {
                return ApiResponse<RegionDTO>.Fail($"Error al actualizar la región: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> DeleteRegionAsync(int id)
        {
            try
            {
                var region = await _regionRepository.GetByIdAsync(id);

                if (region == null || !region.Estado)
                {
                    return ApiResponse<bool>.Fail("La región no existe o ya está inactiva.");
                }

                // Verificar que la región no tenga sucursales asociadas
                if (await _regionRepository.TieneSucursalesAsync(id))
                {
                    return ApiResponse<bool>.Fail("No se puede eliminar la región porque tiene sucursales asociadas.");
                }

                // En lugar de eliminar físicamente, se actualiza el estado a inactivo
                region.Estado = false;
                await _regionRepository.UpdateAsync(region);

                return ApiResponse<bool>.Ok(true, "Región eliminada exitosamente.");
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.Fail($"Error al eliminar la región: {ex.Message}");
            }
        }
    }
}