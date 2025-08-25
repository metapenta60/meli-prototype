package daos

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestImageDAO_TableName(t *testing.T) {
	dao := &ImageDAO{}
	tableName := dao.TableName()

	assert.Equal(t, "images", tableName)
}

func TestImageDAO_ToDomain_WithAllFields(t *testing.T) {
	dao := &ImageDAO{
		ID:               "test-image-id",
		URLSmallVersion:  "https://example.com/small.jpg",
		URLMediumVersion: "https://example.com/medium.jpg",
		Alt:              "Test Product Image",
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-image-id", result.ID)
	assert.Equal(t, "https://example.com/small.jpg", result.URLSmallVersion)
	assert.Equal(t, "https://example.com/medium.jpg", result.URLMediumVersion)
	assert.Equal(t, "Test Product Image", result.Alt)
}

func TestImageDAO_ToDomain_WithEmptyFields(t *testing.T) {
	dao := &ImageDAO{
		ID:               "test-image-id",
		URLSmallVersion:  "",
		URLMediumVersion: "",
		Alt:              "",
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-image-id", result.ID)
	assert.Equal(t, "", result.URLSmallVersion)
	assert.Equal(t, "", result.URLMediumVersion)
	assert.Equal(t, "", result.Alt)
}

func TestImageDAO_ToDomain_WithLongURLs(t *testing.T) {
	dao := &ImageDAO{
		ID:               "test-image-id",
		URLSmallVersion:  "https://very-long-domain-name.example.com/path/to/small/image/with/many/segments/and/parameters?param1=value1&param2=value2",
		URLMediumVersion: "https://very-long-domain-name.example.com/path/to/medium/image/with/many/segments/and/parameters?param1=value1&param2=value2",
		Alt:              "This is a very long alt text that describes the image in great detail for accessibility purposes",
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-image-id", result.ID)
	assert.Equal(t, "https://very-long-domain-name.example.com/path/to/small/image/with/many/segments/and/parameters?param1=value1&param2=value2", result.URLSmallVersion)
	assert.Equal(t, "https://very-long-domain-name.example.com/path/to/medium/image/with/many/segments/and/parameters?param1=value1&param2=value2", result.URLMediumVersion)
	assert.Equal(t, "This is a very long alt text that describes the image in great detail for accessibility purposes", result.Alt)
}
