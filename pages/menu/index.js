import { useEffect, useState } from "react";
import FlexContainer from "../../components/ui/containers/FlexContainer";
import BorderedColumnContainer from "../../components/ui/containers/BorderedColumnContainer";
import MenuCategory from "../../components/menu/MenuCategory";
import MenuCategorySection from "../../components/menu/MenuCategorySection";

export default function MenuPage(props) {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/items", {
        method: "GET",
      });
      const { data } = await response.json();

      console.log(data);
    })();
  }, []);

  const renderCategories = () => {};

  const renderItems = () => {};

  return (
    <FlexContainer>
      <BorderedColumnContainer width="90%">
        <MenuCategorySection>
          <MenuCategory>Entrees</MenuCategory>
          <MenuCategory>Drinks</MenuCategory>
          <MenuCategory>Lunch</MenuCategory>
          <MenuCategory>Category</MenuCategory>
          <MenuCategory>Category</MenuCategory>
          <MenuCategory>Category</MenuCategory>
        </MenuCategorySection>
        {/* <MenuListingsSection>
          <MenuItem></MenuItem>
        </MenuListingsSection> */}
      </BorderedColumnContainer>
    </FlexContainer>
  );
}
