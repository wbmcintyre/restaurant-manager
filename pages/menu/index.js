import { useContext, useEffect, useState } from "react";
import UserContext from "../../store/UserContext";
import FlexContainer from "../../components/ui/containers/FlexContainer";
import BorderedColumnContainer from "../../components/ui/containers/BorderedColumnContainer";
import MenuCategory from "../../components/menu/MenuCategory";
import MenuCategorySection from "../../components/menu/MenuCategorySection";
import MenuItem from "../../components/menu/MenuItem";
import MenuListingsSection from "../../components/menu/MenuListingsSection";

export default function MenuPage(props) {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const context = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/items", {
        method: "GET",
      });
      const { data } = await response.json();

      const filteredCategories = data.reduce((unique, item) => {
        return unique.includes(item.category)
          ? unique
          : [...unique, item.category];
      }, []);
      setCategories(filteredCategories);
      setCurrentCategory(filteredCategories[0]);
      setItems(data);
    })();
  }, []);

  const renderCategories = () => {
    return categories.map((category, index) => {
      return (
        <MenuCategory
          onClick={() => setCurrentCategory(category)}
          isSelected={category === currentCategory}
          key={index}
        >
          {category}
        </MenuCategory>
      );
    });
  };

  const addItemToCart = (item, quantity) => {
    if (quantity > 0) {
      context.addItem(item, quantity);
    }
  };

  const renderItems = () => {
    return items.map((item, index) => {
      if (item.category === currentCategory) {
        return (
          <MenuItem item={item} key={item._id} submitItem={addItemToCart} />
        );
      }
      return false;
    });
  };

  return (
    <FlexContainer>
      <BorderedColumnContainer width="90%">
        <MenuCategorySection>{renderCategories()}</MenuCategorySection>
        <MenuListingsSection>{renderItems()}</MenuListingsSection>
      </BorderedColumnContainer>
    </FlexContainer>
  );
}
