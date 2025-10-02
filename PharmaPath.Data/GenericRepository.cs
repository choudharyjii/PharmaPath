using Dapper;
using System.Data;

namespace PharmaPath. Data;

public interface IGenericRepository
{
    Task<IEnumerable<T>> LoadData<T, U>(string storedProcedure, U parameters);
    Task<IEnumerable<T>> LoadData<U, T>(U parameters, string sql);
    Task SaveData<T>(string storedProcedure, T parameters);
    Task<int> ExecuteSQL<T>(string sqlText);
    Task<R> InsertData<T, R>(string storedProcedure, T parameters);
    Task<T> QuerySingleOrDefaultAsync<U, T>(U parameters, string sql);
}

public class GenericRepository : IGenericRepository
{
    private readonly DapperContext _context;
    public GenericRepository(DapperContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<T>> LoadData<T, U>(string storedProcedure, U parameters)
    {
        using (var connection = _context.CreateConnection())
        {
            return await connection.QueryAsync<T>(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
        }
    }

    public async Task<IEnumerable<T>> LoadData<U, T>(U parameters, string sql)
    {
        using (var connection = _context.CreateConnection())
        {
            return await connection.QueryAsync<T>(sql, parameters,commandType: CommandType.Text);
        }
    }

    public async Task<T> QuerySingleOrDefaultAsync<U, T>(U parameters, string sql)
    {
        using (var connection = _context.CreateConnection())
        {
            return await connection.QuerySingleOrDefaultAsync<T>(sql, parameters, commandType: CommandType.Text);
        }
    }

    public async Task SaveData<T>(string storedProcedure, T parameters)
    {
        using (var connection = _context.CreateConnection())
        {
            await connection.ExecuteAsync(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
        }
    }

    public async Task<R> InsertData<T, R>(string storedProcedure, T parameters)
    {
        using (var connection = _context.CreateConnection())
        {
            return await connection.ExecuteScalarAsync<R>(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
        }
    }

    public async Task<int> ExecuteSQL<T>(string sqlText)
    {
        using (var connection = _context.CreateConnection())
        {
            return await connection.ExecuteAsync(sqlText, null, commandType: CommandType.Text);
        }
    }
}
