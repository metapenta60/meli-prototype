import React from 'react';
import { useTheme } from 'styled-components';
import { 
  RatingContainer, 
  HeatmapBar, 
  HeatmapSegment, 
  MetricsContainer, 
  MetricItem, 
  MetricValue, 
  MetricDescription, 
  MetricIcon 
} from './SellerRating.styled.tsx';
import buildingIcon from '../../assets/building-icon.svg';
import clockIcon from '../../assets/clock-icon.svg';

interface SellerRatingProps {
  rating: number; // 1-5 (puede ser decimal)
  salesCount: number;
  attentionDescription: string;
  puntualityDescription: string;
}

const SellerRating: React.FC<SellerRatingProps> = ({ 
  rating, 
  salesCount, 
  attentionDescription, 
  puntualityDescription 
}) => {
  const theme = useTheme();
  
  // Calcular los colores del heatmap basado en el rating usando el tema
  const getHeatmapColors = (rating: number) => {
    if (rating >= 4.5) return [theme.colors.heatmap.poor, theme.colors.heatmap.fair, theme.colors.heatmap.good, theme.colors.heatmap.veryGood, theme.colors.heatmap.excellent];
    if (rating >= 4.0) return [theme.colors.heatmap.poor, theme.colors.heatmap.fair, theme.colors.heatmap.good, theme.colors.heatmap.veryGood, theme.colors.heatmap.veryGood];
    if (rating >= 3.5) return [theme.colors.heatmap.poor, theme.colors.heatmap.fair, theme.colors.heatmap.good, theme.colors.heatmap.veryGood, theme.colors.heatmap.good];
    if (rating >= 3.0) return [theme.colors.heatmap.poor, theme.colors.heatmap.fair, theme.colors.heatmap.good, theme.colors.heatmap.good, theme.colors.heatmap.veryPoor];
    if (rating >= 2.5) return [theme.colors.heatmap.poor, theme.colors.heatmap.fair, theme.colors.heatmap.veryPoor, theme.colors.heatmap.veryPoor, theme.colors.heatmap.veryPoor];
    if (rating >= 2.0) return [theme.colors.heatmap.poor, theme.colors.heatmap.veryPoor, theme.colors.heatmap.veryPoor, theme.colors.heatmap.veryPoor, theme.colors.heatmap.veryPoor];
    return [theme.colors.heatmap.veryPoor, theme.colors.heatmap.veryPoor, theme.colors.heatmap.veryPoor, theme.colors.heatmap.veryPoor, theme.colors.heatmap.veryPoor];
  };

  const heatmapColors = getHeatmapColors(rating);

  return (
    <RatingContainer>
      <HeatmapBar>
        {heatmapColors.map((color, index) => (
          <HeatmapSegment 
            key={index} 
            color={color}
            isActive={index < Math.floor(rating)}
          />
        ))}
      </HeatmapBar>
      
      <MetricsContainer>
        <MetricItem>
          <MetricValue>+{salesCount}</MetricValue>
          <MetricDescription>Ventas concretadas</MetricDescription>
        </MetricItem>
        
        <MetricItem>
          <MetricIcon>
            <img src={buildingIcon} alt="Edificio" width="20" height="20" />
          </MetricIcon>
          <MetricDescription>{attentionDescription}</MetricDescription>
        </MetricItem>
        
        <MetricItem>
          <MetricIcon>
            <img src={clockIcon} alt="Reloj" width="20" height="20" />
          </MetricIcon>
          <MetricDescription>{puntualityDescription}</MetricDescription>
        </MetricItem>
      </MetricsContainer>
    </RatingContainer>
  );
};

export default SellerRating;
