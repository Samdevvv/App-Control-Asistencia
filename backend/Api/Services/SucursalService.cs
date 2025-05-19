using AutoMapper;
using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Interfaces;
using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Services
{
    public class SucursalService : ISucursalService
    {
        private readonly ISucursalRepository _sucursalRepository;
        private readonly IRegionRepository _regionRepository;
        private readonly IMapper _mapper;

        public SucursalService(ISucursalRepository sucursalRepository, IRegionRepository regionRepository, IMapper mapper)
        {
            _sucursalRepository = sucursalRepository;
            _regionRepository = regionRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponse<IEnumerable<SucursalDTO>>> GetAllSucursalesAsync()
        {
            try
            {
                var sucursales = await _sucursalRepository.GetAsync(s => s.Estado);
                var sucursalesDto = _mapper.Map<IEnumerable<SucursalDTO>>(sucursales);

                return ApiResponse<IEnumerable<SucursalDTO>>.Ok(sucursalesDto);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<SucursalDTO>>.Fail($"Error al obtener las sucursales: {ex.Message}");
            }
        }

        public async Task<ApiResponse<IEnumerable<SucursalDTO>>> GetSucursalesByRegionAsync(int regionId)
        {
            try
            {
                var region = await _regionRepository.GetByIdAsync(regionId);

                if (region == null || !region.Estado)
                {
                    return ApiResponse<IEnumerable<SucursalDTO>>.Fail("La región no existe o está inactiva.");
                }

                var sucursales = await _sucursalRepository.GetBySucursalRegionAsync(regionId);
                var sucursalesDto = _mapper.Map<IEnumerable<SucursalDTO>>(sucursales);

                return ApiResponse<IEnumerable<SucursalDTO>>.Ok(sucursalesDto);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<SucursalDTO>>.Fail($"Error al obtener las sucursales por región: {ex.Message}");
            }
        }

        public async Task<ApiResponse<SucursalDTO>> GetSucursalByIdAsync(int id)
        {
            try
            {
                var sucursal = await _sucursalRepository.GetByIdAsync(id);

                if (sucursal == null || !sucursal.Estado)
                {
                    return ApiResponse<SucursalDTO>.Fail("La sucursal no existe o está inactiva.");
                }

                var sucursalDto = _mapper.Map<SucursalDTO>(sucursal);

                return ApiResponse<SucursalDTO>.Ok(sucursalDto);
            }
            catch (Exception ex)
            {
                return ApiResponse<SucursalDTO>.Fail($"Error al obtener la sucursal: {ex.Message}");
            }
        }

        public async Task<ApiResponse<SucursalDTO>> CreateSucursalAsync(SucursalCreateDTO sucursalDto)
        {
            try
            {
                // Verificar que exista la región
                var region = await _regionRepository.GetByIdAsync(sucursalDto.RegionID);

                if (region == null || !region.Estado)
                {
                    return ApiResponse<SucursalDTO>.Fail("La región no existe o está inactiva.");
                }

                // Verificar que no exista otra sucursal con el mismo nombre en la misma región
                if (await _sucursalRepository.ExisteNombreEnRegionAsync(sucursalDto.Nombre, sucursalDto.RegionID))
                {
                    return ApiResponse<SucursalDTO>.Fail("Ya existe una sucursal con ese nombre en esta región.");
                }

                var sucursal = _mapper.Map<Sucursal>(sucursalDto);
                sucursal.Estado = true;

                var sucursalCreada = await _sucursalRepository.AddAsync(sucursal);
                var sucursalCreadaDto = _mapper.Map<SucursalDTO>(sucursalCreada);
                sucursalCreadaDto.NombreRegion = region.Nombre;

                return ApiResponse<SucursalDTO>.Ok(sucursalCreadaDto, "Sucursal creada exitosamente.");
            }
            catch (Exception ex)
            {
                return ApiResponse<SucursalDTO>.Fail($"Error al crear la sucursal: {ex.Message}");
            }
        }

        public async Task<ApiResponse<SucursalDTO>> UpdateSucursalAsync(SucursalUpdateDTO sucursalDto)
        {
            try
            {
                var sucursalExistente = await _sucursalRepository.GetByIdAsync(sucursalDto.SucursalID);

                if (sucursalExistente == null || !sucursalExistente.Estado)
                {
                    return ApiResponse<SucursalDTO>.Fail("La sucursal no existe o está inactiva.");
                }

                // Verificar que exista la región
                var region = await _regionRepository.GetByIdAsync(sucursalDto.RegionID);

                if (region == null || !region.Estado)
                {
                    return ApiResponse<SucursalDTO>.Fail("La región no existe o está inactiva.");
                }

                // Verificar que no exista otra sucursal con el mismo nombre en la misma región
                if (await _sucursalRepository.ExisteNombreEnRegionAsync(sucursalDto.Nombre, sucursalDto.RegionID, sucursalDto.SucursalID))
                {
                    return ApiResponse<SucursalDTO>.Fail("Ya existe otra sucursal con ese nombre en esta región.");
                }

                _mapper.Map(sucursalDto, sucursalExistente);

                var sucursalActualizada = await _sucursalRepository.UpdateAsync(sucursalExistente);
                var sucursalActualizadaDto = _mapper.Map<SucursalDTO>(sucursalActualizada);
                sucursalActualizadaDto.NombreRegion = region.Nombre;

                return ApiResponse<SucursalDTO>.Ok(sucursalActualizadaDto, "Sucursal actualizada exitosamente.");
            }
            catch (Exception ex)
            {
                return ApiResponse<SucursalDTO>.Fail($"Error al actualizar la sucursal: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> DeleteSucursalAsync(int id)
        {
            try
            {
                var sucursal = await _sucursalRepository.GetByIdAsync(id);

                if (sucursal == null || !sucursal.Estado)
                {
                    return ApiResponse<bool>.Fail("La sucursal no existe o ya está inactiva.");
                }

                // Verificar que la sucursal no tenga empleados asociados
                if (await _sucursalRepository.TieneEmpleadosAsync(id))
                {
                    return ApiResponse<bool>.Fail("No se puede eliminar la sucursal porque tiene empleados asociados.");
                }

                // En lugar de eliminar físicamente, se actualiza el estado a inactivo
                sucursal.Estado = false;
                await _sucursalRepository.UpdateAsync(sucursal);

                return ApiResponse<bool>.Ok(true, "Sucursal eliminada exitosamente.");
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.Fail($"Error al eliminar la sucursal: {ex.Message}");
            }
        }
    }
}