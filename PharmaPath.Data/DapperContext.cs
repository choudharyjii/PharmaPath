using Microsoft.Extensions.Configuration;
using System.Data;
using MySql.Data.MySqlClient;
using Microsoft.Data.SqlClient;

namespace PharmaPath. Data;

public class DapperContext
{
    private readonly IConfiguration _configuration;
    private readonly string? _connectionString;
    public DapperContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString = _configuration.GetConnectionString("DefaultConnection");
    }
    public IDbConnection CreateConnection()
    => new MySqlConnection(_connectionString);
}
