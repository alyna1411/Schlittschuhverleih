using backend.Domain.Rules;
using Xunit;

namespace Backend.Tests;

// Automatisierte Tests für die Regalfachregeln
public class StorageRulesTests
{
    // Gültige Regalfachcodes akzeptieren
    [Theory]
    [InlineData("A1.1")]
    [InlineData("B2.3")]
    [InlineData("C3.3")]
    [InlineData("a1.1")]
    [InlineData(" A1.1 ")]
    public void ValidCode_ShouldReturnTrue(string code)
    {
        Assert.True(StorageRules.IsValidCode(code));
    }

    // Ungültige Regalfachcodes ablehnen
    [Theory]
    [InlineData("D1.1")]
    [InlineData("A4.1")]
    [InlineData("A1.4")]
    [InlineData("A11")]
    [InlineData("")]
    [InlineData(" ")]
    [InlineData(null)]
    public void InvalidCode_ShouldReturnFalse(string? code)
    {
        Assert.False(StorageRules.IsValidCode(code));
    }
}