import { Box } from "@mui/material";
import RecipeCard, { CardData } from './recipe-card';

// Define the type for the props of the CardList component
interface CardListProps {
    cards: CardData[]; // An array of CardData
}


function CardList({ cards }: CardListProps) {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 2 }}>
            {cards.map((card, index) => (
                <RecipeCard
                    key={index}
                    cardData={card}
                />
            ))}
        </Box>
    );
}

export default CardList;