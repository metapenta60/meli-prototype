package config

import (
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestConfig_Load_WithDefaultValues(t *testing.T) {
	// Clear environment variables to test defaults
	os.Unsetenv("HTTP_PORT")
	os.Unsetenv("DB_HOST")
	os.Unsetenv("DB_USER")
	os.Unsetenv("DB_PASSWORD")
	os.Unsetenv("DB_NAME")
	os.Unsetenv("DB_PORT")

	cfg := Load()

	assert.Equal(t, "8080", cfg.HTTPPort)
	assert.Equal(t, "localhost", cfg.DBHost)
	assert.Equal(t, "postgres", cfg.DBUser)
	assert.Equal(t, "postgres", cfg.DBPassword)
	assert.Equal(t, "app", cfg.DBName)
	assert.Equal(t, "5432", cfg.DBPort)
}

func TestConfig_Load_WithEnvironmentVariables(t *testing.T) {
	// Set environment variables
	os.Setenv("HTTP_PORT", "9090")
	os.Setenv("DB_HOST", "test-db-host")
	os.Setenv("DB_USER", "test-user")
	os.Setenv("DB_PASSWORD", "test-password")
	os.Setenv("DB_NAME", "test-db")
	os.Setenv("DB_PORT", "5433")

	cfg := Load()

	assert.Equal(t, "9090", cfg.HTTPPort)
	assert.Equal(t, "test-db-host", cfg.DBHost)
	assert.Equal(t, "test-user", cfg.DBUser)
	assert.Equal(t, "test-password", cfg.DBPassword)
	assert.Equal(t, "test-db", cfg.DBName)
	assert.Equal(t, "5433", cfg.DBPort)

	// Clean up
	os.Unsetenv("HTTP_PORT")
	os.Unsetenv("DB_HOST")
	os.Unsetenv("DB_USER")
	os.Unsetenv("DB_PASSWORD")
	os.Unsetenv("DB_NAME")
	os.Unsetenv("DB_PORT")
}

func TestConfig_Load_WithMixedValues(t *testing.T) {
	// Set some environment variables, leave others unset
	os.Setenv("HTTP_PORT", "7070")
	os.Setenv("DB_USER", "custom-user")
	os.Setenv("DB_PASSWORD", "custom-password")

	cfg := Load()

	assert.Equal(t, "7070", cfg.HTTPPort)
	assert.Equal(t, "localhost", cfg.DBHost) // default
	assert.Equal(t, "custom-user", cfg.DBUser)
	assert.Equal(t, "custom-password", cfg.DBPassword)
	assert.Equal(t, "app", cfg.DBName)  // default
	assert.Equal(t, "5432", cfg.DBPort) // default

	// Clean up
	os.Unsetenv("HTTP_PORT")
	os.Unsetenv("DB_USER")
	os.Unsetenv("DB_PASSWORD")
}

func TestConfig_Load_WithEmptyEnvironmentVariables(t *testing.T) {
	// Set empty environment variables
	os.Setenv("HTTP_PORT", "")
	os.Setenv("DB_HOST", "")
	os.Setenv("DB_USER", "")
	os.Setenv("DB_PASSWORD", "")
	os.Setenv("DB_NAME", "")
	os.Setenv("DB_PORT", "")

	cfg := Load()

	assert.Equal(t, "8080", cfg.HTTPPort)
	assert.Equal(t, "localhost", cfg.DBHost)
	assert.Equal(t, "postgres", cfg.DBUser)
	assert.Equal(t, "postgres", cfg.DBPassword)
	assert.Equal(t, "app", cfg.DBName)
	assert.Equal(t, "5432", cfg.DBPort)

	// Clean up
	os.Unsetenv("HTTP_PORT")
	os.Unsetenv("DB_HOST")
	os.Unsetenv("DB_USER")
	os.Unsetenv("DB_PASSWORD")
	os.Unsetenv("DB_PORT")
	os.Unsetenv("DB_NAME")
}

func TestConfig_Load_WithSpecialCharacters(t *testing.T) {
	// Set environment variables with special characters
	os.Setenv("DB_PASSWORD", "p@ssw0rd!@#$%")
	os.Setenv("DB_NAME", "test-db_123")
	os.Setenv("DB_HOST", "test-host.example.com")

	cfg := Load()

	assert.Equal(t, "p@ssw0rd!@#$%", cfg.DBPassword)
	assert.Equal(t, "test-db_123", cfg.DBName)
	assert.Equal(t, "test-host.example.com", cfg.DBHost)

	// Clean up
	os.Unsetenv("DB_PASSWORD")
	os.Unsetenv("DB_NAME")
	os.Unsetenv("DB_HOST")
}
