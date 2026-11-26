namespace backend.Domain.Rules;

public static class StorageRules
{
    // Zulässige Regalfachcodes: A1.1-C3.3
    public static bool IsValidCode(string? code)
    {
        if (string.IsNullOrWhiteSpace(code))
            return false;

        string normalizedCode = code.Trim().ToUpperInvariant();

        return System.Text.RegularExpressions.Regex.IsMatch(
            normalizedCode,
            @"^[ABC][1-3]\.[1-3]$"
        );
    }
}