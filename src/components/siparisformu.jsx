import React, { useState } from "react";
import "./order.css";
import axios from "axios";

import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Order() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();

  const valueToText = (item) => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  };

  const sizeOptions = ["küçük", "orta", "büyük"];
  const [selectedSize, setSelectedSize] = useState("küçük");

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const doughOptions = ["ince", "klasik", "kalın"];
  const [selectedDough, setSelectedDough] = useState("");

  const handleDoughChange = (event) => {
    setSelectedDough(event.target.value);
  };

  const ekstralar = [
    "Pepperoni",
    "Sosis",
    "Kanada Jambonu",
    "Tavuk Izgara",
    "Soğan",
    "Domates",
    "Mısır",
    "Jalepeno",
    "Sarımsak",
    "Biber",
    "Sucuk",
    "Ananas",
    "Kabak",
  ];

  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(id)) {
        return prevCheckedItems.filter((item) => item !== id);
      } else {
        if (prevCheckedItems.length >= 10) {
          return prevCheckedItems;
        }
        return [...prevCheckedItems, id];
      }
    });
  };

  const [counter, setCounter] = useState(1);

  const increaseCounter = () => setCounter(counter + 1);
  const decreaseCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const basePrice = 85.5;
  const extraIngredientPrice = 5;
  const extraCost = checkedItems.length * extraIngredientPrice;
  const totalPrice = (basePrice + extraCost) * counter;

  const [name, setName] = useState("");

  const isFormValid =
    selectedSize &&
    selectedDough &&
    checkedItems.length >= 4 &&
    checkedItems.length <= 10 &&
    name.length >= 3;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);

    const selectedLabels = checkedItems
      .map((id) => {
        const selectedIngredient = extraIngredients.find(
          (ingredient) => ingredient.id === id
        );
        return selectedIngredient ? selectedIngredient.label : null;
      })
      .filter((label) => label != null);

    const orderData = {
      name: name,
      size: selectedSize,
      dough: selectedDough,
      ingredients: selectedLabels,
      quantity: counter,
      totalPrice: totalPrice.toFixed(2),
    };

    try {
      const response = await axios.post(
        "https://reqres.in/api/pizza",
        orderData
      );
      console.log("Sipariş Özeti:", response.data);

      setTimeout(() => {
        history.push("/success");
      }, 3500);
    } catch (error) {
      console.error("Sipariş gönderilemedi:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header>
        <img src="images/iteration-1-images/logo.svg" alt="logo" />
        <div id="header-container"></div>
      </header>
      <div id="wrapper">
        <main>
          <h2 id="title">Position Absolute Acı Pizza</h2>
          <div className="upper">
            <h2 id="price">{basePrice.toFixed(2)}₺</h2>
            <span id="score">4.9</span>
            <span id="comment-count">(200)</span>
          </div>
          <p id="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            obcaecati excepturi eaque. Ab quibusdam aliquid quisquam debitis
            expedita consequatur, assumenda fuga voluptatem suscipit at ea
            consectetur, voluptatibus minus minima nesciunt porro inventore a
            maxime labore. Molestias natus molestiae ex iste esse perspiciatis
            non voluptatibus iure, ratione delectus eaque rem nisi vitae
            laboriosam. Nesciunt officiis doloribus delectus eligendi,
            voluptatum unde eveniet.
          </p>
        </main>
        <section id="selection">
          <div id="size">
            <h3>Boyut Seç</h3>
            {sizeOptions.map((size) => (
              <div key={size}>
                <label htmlFor={size}>
                  <input
                    id={size}
                    type="radio"
                    value={size}
                    checked={selectedSize === size}
                    onChange={handleSizeChange}
                  />
                  {valueToText(size)}
                </label>
              </div>
            ))}
          </div>
          <div id="dough">
            <h3>Hamur Seç</h3>
            <label htmlFor="thickness">
              <select
                id="thickness"
                value={selectedDough}
                onChange={handleDoughChange}
              >
                <option id="placeholder" value="" disabled hidden>
                  Hamur Kalınlığı
                </option>
                {doughOptions.map((dough, index) => (
                  <option key={index} value={dough}>
                    {valueToText(dough)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>
        <section id="extra">
          <h3>Ek Malzemeler</h3>
          <p>En az 4, en fazla 10 adet malzeme seçebilirsiniz. (5₺)</p>
          <div className="checkbox-container">
            {ekstralar.map((ingredient, index) => (
              <label className="container" key={index}>
                <input
                  type="checkbox"
                  checked={checkedItems.includes(ingredient)} 
                  onChange={() => handleCheckboxChange(ingredient)}
                />
                {ingredient}
                <span className="checkmark"></span>
              </label>
            ))}
          </div>
          </section>
        <section id="username">
          <h3>İsim Soyisim</h3>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </section>
        <section id="note">
          <h3>Sipariş Notu</h3>
          <input
            type="text"
            placeholder="Sipariş notunuz?"
          />
        </section>
        <hr />
        <footer>
          <div id="counter">
            <button className="btn" onClick={decreaseCounter}>
              -
            </button>
            <div id="counter-value">{counter}</div>
            <button className="btn" onClick={increaseCounter}>
              +
            </button>
          </div>
          <div id="footer-couple">
            <div id="buyout">
              <h3 id="left-title">Sipariş Toplamı</h3>
              <div id="left-col">
                <span
                  style={{
                    visibility: checkedItems.length > 0 ? "visible" : "hidden",
                  }}
                >
                  Seçimler
                </span>
                <span
                  style={{
                    visibility: checkedItems.length > 0 ? "visible" : "hidden",
                  }}
                >
                  {extraCost.toFixed(2)}₺
                </span>
              </div>
              <div id="right-col">
                <span>Toplam</span>
                <span>{totalPrice.toFixed(2)}₺</span>
              </div>
            </div>
            <button
              id="complete-btn"
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
            >
              <h3>{isSubmitting ? "Gönderiliyor..." : "SİPARİŞ VER"}</h3>
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}

export default withRouter(Order);
