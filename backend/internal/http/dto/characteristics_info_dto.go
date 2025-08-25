package dto

type CharacteristicsInfoDTO struct {
	MainCharacteristics  []MainCharacteristicDTO   `json:"mainCharacteristics"`
	OtherCharacteristics []CharacteristicsGroupDTO `json:"otherCharacteristics"`
}
