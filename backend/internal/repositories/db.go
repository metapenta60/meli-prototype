package repositories

import (
	"database/sql"
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DbWrapper struct {
	DB *gorm.DB
}

func NewDbWrapper(host, user, password, dbname, port string) (*DbWrapper, error) {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		host, user, password, dbname, port,
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("failed to get underlying sql.DB: %w", err)
	}

	if err := configurePool(sqlDB); err != nil {
		return nil, fmt.Errorf("failed to configure connection pool: %w", err)
	}

	return &DbWrapper{DB: db}, nil
}

// configurePool configures the database connection pool
func configurePool(sqlDB *sql.DB) error {
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	return nil
}

func (d *DbWrapper) Preload(query string, args ...interface{}) *gorm.DB {
	return d.DB.Preload(query, args...)
}

func (d *DbWrapper) Close() error {
	if d.DB == nil {
		return nil
	}

	sqlDB, err := d.DB.DB()
	if err != nil {
		return fmt.Errorf("failed to get underlying sql.DB: %w", err)
	}

	return sqlDB.Close()
}

func (d *DbWrapper) HealthCheck() error {
	sqlDB, err := d.DB.DB()
	if err != nil {
		return fmt.Errorf("failed to get underlying sql.DB: %w", err)
	}

	return sqlDB.Ping()
}
