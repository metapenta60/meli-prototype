package repositories

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestNewDbWrapper_WithValidParams(t *testing.T) {
	host := "localhost"
	user := "testuser"
	password := "testpass"
	dbname := "testdb"
	port := "5432"

	_, err := NewDbWrapper(host, user, password, dbname, port)

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "failed to connect to database")
}

func TestNewDbWrapper_WithEmptyParams(t *testing.T) {
	_, err := NewDbWrapper("", "", "", "", "")

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "failed to connect to database")
}

func TestDbWrapper_Preload(t *testing.T) {
	wrapper := &DbWrapper{}

	assert.NotNil(t, wrapper.Preload)
}

func TestDbWrapper_Close_WithNilDB(t *testing.T) {
	wrapper := &DbWrapper{DB: nil}

	err := wrapper.Close()
	assert.NoError(t, err)
}

func TestDbWrapper_HealthCheck_WithNilDB(t *testing.T) {
	wrapper := &DbWrapper{DB: nil}

	assert.Panics(t, func() {
		wrapper.HealthCheck()
	})
}
