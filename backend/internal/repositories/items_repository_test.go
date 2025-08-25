package repositories

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestNew(t *testing.T) {
	mockDbWrapper := &DbWrapper{}
	repo := New(mockDbWrapper)

	assert.NotNil(t, repo)
	assert.Equal(t, mockDbWrapper, repo.dbWrapper)
}

func TestItemsRepository_GetEnriched_WithNilDbWrapper(t *testing.T) {
	repo := New(nil)

	assert.Panics(t, func() {
		repo.GetEnriched("test-id")
	})
}

func TestItemsRepository_GetEnriched_WithEmptyDbWrapper(t *testing.T) {
	emptyDbWrapper := &DbWrapper{DB: nil}
	repo := New(emptyDbWrapper)

	assert.Panics(t, func() {
		repo.GetEnriched("test-id")
	})
}

func TestItemsRepository_GetEnriched_WithValidDbWrapper(t *testing.T) {
	validDbWrapper := &DbWrapper{}
	repo := New(validDbWrapper)

	assert.Panics(t, func() {
		repo.GetEnriched("test-id")
	})
}

func TestItemsRepository_GetEnriched_WithEmptyID(t *testing.T) {
	// Test with empty ID
	validDbWrapper := &DbWrapper{}
	repo := New(validDbWrapper)

	// This should panic when trying to access the DB
	assert.Panics(t, func() {
		repo.GetEnriched("")
	})
}
