package dto

type CharacteristicsGroupDTO struct {
	Title           string                  `json:"title"`
	Characteristics []CharacteristicItemDTO `json:"characteristics"`
}
