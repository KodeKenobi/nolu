import { POPULAR_TOKENS, MAINNET_TOKENS, TOKEN_CATEGORIES } from "../config";
import { Token } from "../components/types";

export const getFilteredTokens = (
  selectedCategory: string,
  tokenSearchQuery: string
): Token[] => {
  const allTokens = [
    ...POPULAR_TOKENS,
    ...MAINNET_TOKENS.filter(
      (token) => !POPULAR_TOKENS.find((t) => t.address === token.address)
    ),
  ];

  let tokensToFilter = allTokens;

  if (selectedCategory !== "all" && selectedCategory in TOKEN_CATEGORIES) {
    const category =
      TOKEN_CATEGORIES[selectedCategory as keyof typeof TOKEN_CATEGORIES];
    if (Array.isArray(category)) {
      tokensToFilter = allTokens.filter((token) => {
        return category.some(
          (catToken) =>
            catToken.symbol === token.symbol ||
            catToken.address.toLowerCase() === token.address.toLowerCase()
        );
      });
    }
  }

  const query = tokenSearchQuery.toLowerCase().trim();
  if (!query) return tokensToFilter.slice(0, 20);

  return tokensToFilter
    .filter(
      (token) =>
        token.name.toLowerCase().includes(query) ||
        token.symbol.toLowerCase().includes(query) ||
        token.address.toLowerCase().includes(query)
    )
    .slice(0, 20);
};
