using NLog;

public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly Logger _logger = LogManager.GetCurrentClassLogger();

    public ErrorHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            var massage = ex.ToString();
            _logger.Error(massage, "An unhandled exception occurred.");

            // Customize error response based on the exception type
            context.Response.StatusCode = 500;
            await context.Response.WriteAsJsonAsync(new { message = "An unexpected error occurred." });
        }
    }
}