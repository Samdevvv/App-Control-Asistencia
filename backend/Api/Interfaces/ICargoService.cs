using DefensoriaAsistencia.Core.DTOs;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface ICargoService
    {
        Task<ApiResponse<IEnumerable<CargoDTO>>> GetAllCargosAsync();
        Task<ApiResponse<IEnumerable<CargoDTO>>> GetCargosByDepartamentoAsync(int departamentoId);
        Task<ApiResponse<CargoDTO>> GetCargoByIdAsync(int id);
        Task<ApiResponse<CargoDTO>> CreateCargoAsync(CargoCreateDTO cargoDto);
        Task<ApiResponse<CargoDTO>> UpdateCargoAsync(CargoUpdateDTO cargoDto);
        Task<ApiResponse<bool>> DeleteCargoAsync(int id);
    }
}