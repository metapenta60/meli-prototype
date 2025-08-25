package config

import (
	"log"
	"os"
)

type Config struct {
	HTTPPort   string
	DBHost     string
	Env        string
	DBUser     string
	DBPassword string
	DBName     string
	DBPort     string
}

func Load() Config {
	_ = loadDotEnvIfExists()

	cfg := Config{
		HTTPPort:   get("HTTP_PORT", "8080"),
		DBHost:     get("DB_HOST", "localhost"),
		DBUser:     get("DB_USER", "postgres"),
		DBPassword: get("DB_PASSWORD", "postgres"),
		DBName:     get("DB_NAME", "app"),
		DBPort:     get("DB_PORT", "5432"),
	}
	return cfg
}

func get(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}

func loadDotEnvIfExists() error {
	if _, err := os.Stat(".env"); err == nil {
		log.Println("use godotenv to load .env") // TODO: usar godotenv
	}
	return nil
}
