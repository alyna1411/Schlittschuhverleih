using backend.Application.DTOs.Storage;
using backend.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/storage")]
public class StorageController : ControllerBase
{
    private readonly StorageService _storageService;

    public StorageController(StorageService storageService)
    {
        _storageService = storageService;
    }

    // Alle Regalfächer mit ihrer aktuellen Belegung abrufen
    [HttpGet]
    public async Task<ActionResult<List<StorageLocationResponseDto>>> GetAll()
    {
        var locations = await _storageService.GetAllAsync();
        return Ok(locations);
    }
}
