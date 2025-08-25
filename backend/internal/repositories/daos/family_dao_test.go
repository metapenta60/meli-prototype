package daos

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestFamilyDAO_TableName(t *testing.T) {
	dao := &FamilyDAO{}
	tableName := dao.TableName()

	assert.Equal(t, "families", tableName)
}

func TestFamilyDAO_ToDomain_WithAllFields(t *testing.T) {
	dao := &FamilyDAO{
		FamilyID: "test-family-id",
		Title:    "Electronics",
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-family-id", result.ID)
	assert.Equal(t, "Electronics", result.Title)
}

func TestFamilyDAO_ToDomain_WithEmptyTitle(t *testing.T) {
	dao := &FamilyDAO{
		FamilyID: "test-family-id",
		Title:    "",
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-family-id", result.ID)
	assert.Equal(t, "", result.Title)
}

func TestFamilyDAO_ToDomain_WithLongTitle(t *testing.T) {
	dao := &FamilyDAO{
		FamilyID: "test-family-id",
		Title:    "This is a very long family title that might be used in the system",
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-family-id", result.ID)
	assert.Equal(t, "This is a very long family title that might be used in the system", result.Title)
}
