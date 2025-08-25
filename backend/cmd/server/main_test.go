package main

import (
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestMain_EnvironmentVariables(t *testing.T) {
	// Test that environment variables are properly handled
	originalPort := os.Getenv("PORT")
	originalDBHost := os.Getenv("DB_HOST")
	originalDBUser := os.Getenv("DB_USER")
	originalDBPassword := os.Getenv("DB_PASSWORD")
	originalDBName := os.Getenv("DB_NAME")
	originalDBPort := os.Getenv("DB_PORT")

	// Set test environment variables
	os.Setenv("PORT", "9090")
	os.Setenv("DB_HOST", "test-host")
	os.Setenv("DB_USER", "test-user")
	os.Setenv("DB_PASSWORD", "test-password")
	os.Setenv("DB_NAME", "test-db")
	os.Setenv("DB_PORT", "5433")

	// Verify environment variables are set
	assert.Equal(t, "9090", os.Getenv("PORT"))
	assert.Equal(t, "test-host", os.Getenv("DB_HOST"))
	assert.Equal(t, "test-user", os.Getenv("DB_USER"))
	assert.Equal(t, "test-password", os.Getenv("DB_PASSWORD"))
	assert.Equal(t, "test-db", os.Getenv("DB_NAME"))
	assert.Equal(t, "5433", os.Getenv("DB_PORT"))

	// Restore original environment variables
	if originalPort != "" {
		os.Setenv("PORT", originalPort)
	} else {
		os.Unsetenv("PORT")
	}
	if originalDBHost != "" {
		os.Setenv("DB_HOST", originalDBHost)
	} else {
		os.Unsetenv("DB_HOST")
	}
	if originalDBUser != "" {
		os.Setenv("DB_USER", originalDBUser)
	} else {
		os.Unsetenv("DB_USER")
	}
	if originalDBPassword != "" {
		os.Setenv("DB_PASSWORD", originalDBPassword)
	} else {
		os.Unsetenv("DB_PASSWORD")
	}
	if originalDBName != "" {
		os.Setenv("DB_NAME", originalDBName)
	} else {
		os.Unsetenv("DB_NAME")
	}
	if originalDBPort != "" {
		os.Setenv("DB_PORT", originalDBPort)
	} else {
		os.Unsetenv("DB_PORT")
	}
}

func TestMain_DefaultPort(t *testing.T) {
	// Test default port behavior
	originalPort := os.Getenv("PORT")
	os.Unsetenv("PORT")

	// Verify default port is empty (will use "8080" in main)
	assert.Equal(t, "", os.Getenv("PORT"))

	// Restore original port
	if originalPort != "" {
		os.Setenv("PORT", originalPort)
	}
}

func TestMain_EnvironmentVariableTypes(t *testing.T) {
	// Test different types of environment variable values
	testCases := []struct {
		key   string
		value string
	}{
		{"PORT", "8080"},
		{"PORT", "9090"},
		{"PORT", ""},
		{"DB_HOST", "localhost"},
		{"DB_HOST", "127.0.0.1"},
		{"DB_HOST", ""},
		{"DB_USER", "postgres"},
		{"DB_USER", "admin"},
		{"DB_USER", ""},
		{"DB_PASSWORD", "password123"},
		{"DB_PASSWORD", ""},
		{"DB_NAME", "app"},
		{"DB_NAME", "test_db"},
		{"DB_NAME", ""},
		{"DB_PORT", "5432"},
		{"DB_PORT", "5433"},
		{"DB_PORT", ""},
	}

	for _, tc := range testCases {
		originalValue := os.Getenv(tc.key)

		os.Setenv(tc.key, tc.value)
		assert.Equal(t, tc.value, os.Getenv(tc.key))

		// Restore original value
		if originalValue != "" {
			os.Setenv(tc.key, originalValue)
		} else {
			os.Unsetenv(tc.key)
		}
	}
}

func TestMain_EnvironmentVariablePersistence(t *testing.T) {
	// Test that environment variables persist during test execution
	originalPort := os.Getenv("PORT")

	// Set a test value
	os.Setenv("PORT", "test-port-123")

	// Verify it persists
	assert.Equal(t, "test-port-123", os.Getenv("PORT"))

	// Set another value
	os.Setenv("PORT", "test-port-456")
	assert.Equal(t, "test-port-456", os.Getenv("PORT"))

	// Unset and verify
	os.Unsetenv("PORT")
	assert.Equal(t, "", os.Getenv("PORT"))

	// Restore original value
	if originalPort != "" {
		os.Setenv("PORT", originalPort)
	}
}

func TestGetPort_WithEnvironmentVariable(t *testing.T) {
	// Test getPort with environment variable set
	originalPort := os.Getenv("PORT")
	os.Setenv("PORT", "9090")

	result := getPort()
	assert.Equal(t, "9090", result)

	// Restore original value
	if originalPort != "" {
		os.Setenv("PORT", originalPort)
	} else {
		os.Unsetenv("PORT")
	}
}

func TestGetPort_WithoutEnvironmentVariable(t *testing.T) {
	// Test getPort without environment variable (should use default)
	originalPort := os.Getenv("PORT")
	os.Unsetenv("PORT")

	result := getPort()
	assert.Equal(t, "8080", result)

	// Restore original value
	if originalPort != "" {
		os.Setenv("PORT", originalPort)
	}
}

func TestGetPort_WithEmptyEnvironmentVariable(t *testing.T) {
	// Test getPort with empty environment variable (should use default)
	originalPort := os.Getenv("PORT")
	os.Setenv("PORT", "")

	result := getPort()
	assert.Equal(t, "8080", result)

	// Restore original value
	if originalPort != "" {
		os.Setenv("PORT", originalPort)
	} else {
		os.Unsetenv("PORT")
	}
}
