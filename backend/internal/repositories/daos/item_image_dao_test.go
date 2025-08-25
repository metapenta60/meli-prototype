package daos

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestItemImageDAO_TableName(t *testing.T) {
	dao := &ItemImageDAO{}
	tableName := dao.TableName()

	assert.Equal(t, "item_images", tableName)
}

func TestItemImageDAO_ToDomain_WithImage(t *testing.T) {
	dao := &ItemImageDAO{
		ID:      "test-item-image-id",
		ItemID:  "test-item-id",
		ImageID: "test-image-id",
		Image: &ImageDAO{
			ID:               "test-image-id",
			URLSmallVersion:  "https://example.com/small.jpg",
			URLMediumVersion: "https://example.com/medium.jpg",
			Alt:              "Test Item Image",
		},
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-item-image-id", result.ID)
	assert.Equal(t, "https://example.com/small.jpg", result.URLSmallVersion)
	assert.Equal(t, "https://example.com/medium.jpg", result.URLMediumVersion)
	assert.Equal(t, "Test Item Image", result.Alt)
}

func TestItemImageDAO_ToDomain_WithEmptyImage(t *testing.T) {
	dao := &ItemImageDAO{
		ID:      "test-item-image-id",
		ItemID:  "test-item-id",
		ImageID: "test-image-id",
		Image: &ImageDAO{
			ID:               "test-image-id",
			URLSmallVersion:  "",
			URLMediumVersion: "",
			Alt:              "",
		},
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-item-image-id", result.ID)
	assert.Equal(t, "", result.URLSmallVersion)
	assert.Equal(t, "", result.URLMediumVersion)
	assert.Equal(t, "", result.Alt)
}

func TestItemImagesDAO_ToDomain(t *testing.T) {
	daos := ItemImagesDAO{
		{
			ID:      "item-image-1",
			ItemID:  "item-1",
			ImageID: "image-1",
			Image: &ImageDAO{
				ID:               "image-1",
				URLSmallVersion:  "https://example.com/small1.jpg",
				URLMediumVersion: "https://example.com/medium1.jpg",
				Alt:              "Image 1",
			},
		},
		{
			ID:      "item-image-2",
			ItemID:  "item-2",
			ImageID: "image-2",
			Image: &ImageDAO{
				ID:               "image-2",
				URLSmallVersion:  "https://example.com/small2.jpg",
				URLMediumVersion: "https://example.com/medium2.jpg",
				Alt:              "Image 2",
			},
		},
	}

	result := daos.ToDomain()

	assert.NotNil(t, result)
	assert.Len(t, result, 2)
	assert.Equal(t, "item-image-1", result[0].ID)
	assert.Equal(t, "item-image-2", result[1].ID)
	assert.Equal(t, "https://example.com/small1.jpg", result[0].URLSmallVersion)
	assert.Equal(t, "https://example.com/small2.jpg", result[1].URLSmallVersion)
}

func TestItemImagesDAO_ToDomain_Empty(t *testing.T) {
	daos := ItemImagesDAO{}

	result := daos.ToDomain()

	assert.NotNil(t, result)
	assert.Len(t, result, 0)
}
