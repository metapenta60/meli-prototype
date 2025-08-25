package daos

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestQuestionDAO_TableName(t *testing.T) {
	dao := &QuestionDAO{}
	tableName := dao.TableName()

	assert.Equal(t, "questions", tableName)
}

func TestQuestionDAO_ToDomain_WithAllFields(t *testing.T) {
	createdAt := time.Date(2024, 1, 15, 10, 30, 0, 0, time.UTC)
	dao := &QuestionDAO{
		ID:        "test-question-id",
		ItemID:    "test-item-id",
		Question:  "What is the warranty period for this product?",
		Answer:    "This product comes with a 2-year warranty.",
		CreatedAt: createdAt,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-question-id", result.ID)
	assert.Equal(t, "What is the warranty period for this product?", result.Question)
	assert.Equal(t, "This product comes with a 2-year warranty.", result.Answer)
	assert.Equal(t, createdAt, result.CreatedAt)
}

func TestQuestionDAO_ToDomain_WithEmptyAnswer(t *testing.T) {
	createdAt := time.Date(2024, 1, 15, 10, 30, 0, 0, time.UTC)
	dao := &QuestionDAO{
		ID:        "test-question-id",
		ItemID:    "test-item-id",
		Question:  "Is this product available in other colors?",
		Answer:    "",
		CreatedAt: createdAt,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-question-id", result.ID)
	assert.Equal(t, "Is this product available in other colors?", result.Question)
	assert.Equal(t, "", result.Answer)
	assert.Equal(t, createdAt, result.CreatedAt)
}

func TestQuestionDAO_ToDomain_WithLongQuestion(t *testing.T) {
	createdAt := time.Date(2024, 1, 15, 10, 30, 0, 0, time.UTC)
	dao := &QuestionDAO{
		ID:        "test-question-id",
		ItemID:    "test-item-id",
		Question:  "This is a very long question that contains many details about the product specifications, warranty terms, shipping options, and customer support availability. The question is designed to test how the system handles long text inputs.",
		Answer:    "This is a comprehensive answer that addresses all the concerns mentioned in the detailed question above.",
		CreatedAt: createdAt,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-question-id", result.ID)
	assert.Equal(t, "This is a very long question that contains many details about the product specifications, warranty terms, shipping options, and customer support availability. The question is designed to test how the system handles long text inputs.", result.Question)
	assert.Equal(t, "This is a comprehensive answer that addresses all the concerns mentioned in the detailed question above.", result.Answer)
	assert.Equal(t, createdAt, result.CreatedAt)
}

func TestQuestionsDAO_ToDomain(t *testing.T) {
	createdAt1 := time.Date(2024, 1, 15, 10, 30, 0, 0, time.UTC)
	createdAt2 := time.Date(2024, 1, 16, 14, 45, 0, 0, time.UTC)

	daos := QuestionsDAO{
		{
			ID:        "question-1",
			ItemID:    "item-1",
			Question:  "First question?",
			Answer:    "First answer.",
			CreatedAt: createdAt1,
		},
		{
			ID:        "question-2",
			ItemID:    "item-2",
			Question:  "Second question?",
			Answer:    "Second answer.",
			CreatedAt: createdAt2,
		},
	}

	result := daos.ToDomain()

	assert.NotNil(t, result)
	assert.Len(t, result, 2)
	assert.Equal(t, "question-1", result[0].ID)
	assert.Equal(t, "question-2", result[1].ID)
	assert.Equal(t, "First question?", result[0].Question)
	assert.Equal(t, "Second question?", result[1].Question)
}

func TestQuestionsDAO_ToDomain_Empty(t *testing.T) {
	daos := QuestionsDAO{}

	result := daos.ToDomain()

	assert.NotNil(t, result)
	assert.Len(t, result, 0)
}
