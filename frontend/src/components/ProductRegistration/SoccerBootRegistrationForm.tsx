import { useState } from "react";
import "../ProductRegistration/SoccerBootRegistrationForm.css";
import { useProducts } from "../../contexts/ProductsContext";
import { useRegistry } from "../../contexts/RegistryContext";
import { api } from "../../endpoints/api";
const SoccerBootRegistrationForm: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>();
  const [line, setLine] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [urlPreview, setUrlPreview] = useState<string | null>(null);

  const { colors, brands, lines } = useProducts();
  const { isSoccerBootOpen, isBrandOpen, isColorOpen, isLineOpen } =
    useRegistry();
  const types = ["Campo", "Salao", "Suico", "Trava-Mista", "Todas"];

  const handleRegistryLine = async () => {
    try {
      const response = await api.post(
        "registry_line",
        { line: line },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      window.alert("Registro feito com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer registro:", error);
      window.alert("Ocorreu um erro ao fazer o registro");
    }
  };

  const handleRegistryBrand = async () => {
    const response = await api.post(
      "registry_brand",
      { brand: brand },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    window.alert("Registro feito com sucesso!");
  };

  const handleRegistryColor = async () => {
    const response = await api.post(
      "registry_color",
      { color: color, color_code: colorCode },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    window.alert("Registro feito com sucesso!");
  };

  const handleRegistryProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    if (selectedType) formData.append("type", selectedType);
    if (image) formData.append("boot_image", image);

    const bootieValue = formData.get("bootie") ? "on" : "off";
    formData.set("bootie", bootieValue);

    try {
      const response = await api.post("registry_product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Erro no registro do produto:", error);
    }
  };

  return (
    <div>
      {isSoccerBootOpen && (
        <form className="registration-form" onSubmit={handleRegistryProduct}>
          <h2>Registrar Chuteiras</h2>

          <div className="input-div">
            <label htmlFor="image">Imagem: </label>
            <input
              className="input-img"
              type="file"
              name="image"
              id="image"
              required
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                  setUrlPreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
            {urlPreview && (
              <img className="prev" src={urlPreview} alt="prévia da imagem" />
            )}
          </div>

          <div className="input-div">
            <label htmlFor="brands">Marca: </label>
            <select
              className="registry-select"
              required
              name="brands"
              id="brands"
            >
              {brands.map((brand) => (
                <option key={brand.brand} value={brand.brand}>
                  {brand.brand}
                </option>
              ))}
            </select>
          </div>

          <div className="input-div">
            <label htmlFor="lines">Linha: </label>
            <select
              className="registry-select"
              required
              name="lines"
              id="lines"
            >
              {lines.map((line) => (
                <option key={line.line} value={line.line}>
                  {line.line}
                </option>
              ))}
            </select>
          </div>

          <div className="input-div">
            <label htmlFor="colors">Cor: </label>
            <select
              className="registry-select"
              required
              name="colors"
              id="colors"
            >
              {colors.map((color) => (
                <option key={color.color} value={color.color}>
                  {color.color}
                </option>
              ))}
            </select>
          </div>

          <div className="input-div">
            <label htmlFor="bootie">Botinha: </label>
            <input required type="radio" id="bootie" name="bootie" />
          </div>

          <div className="input-div">
            <label htmlFor="price">Preço: </label>
            <input required type="number" id="price" name="price" />
          </div>

          <div className="input-div" id="filters-types">
            <label htmlFor="types">Tipo: </label>
            <select
              className="registry-select"
              required
              name="types"
              id="types"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="input-div">
            <label htmlFor="description">Descrição: </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              cols={50}
              required
            />
          </div>
          <button className="save-button" type="submit">
            Salvar Produto
          </button>
        </form>
      )}
      {isBrandOpen && (
        <div className="registration-form">
          <h2>Registrar Marcas</h2>
          <div className="input-div">
            <label htmlFor="brand">Marca:</label>
            <input
              onChange={(e) => setBrand(e.target.value)}
              type="text"
              name="brand"
              id="brand"
            />
          </div>
          <button
            type="button"
            onClick={handleRegistryBrand}
            className="save-button"
          >
            Salvar Marca
          </button>
        </div>
      )}
      {isLineOpen && (
        <div className="registration-form">
          <h2>Registrar Linhas</h2>
          <div className="input-div">
            <label htmlFor="line">Linha:</label>
            <input
              onChange={(e) => setLine(e.target.value)}
              type="text"
              name="line"
              id="line"
            />
          </div>
          <button
            type="button"
            onClick={handleRegistryLine}
            className="save-button"
          >
            Salvar Linha
          </button>
        </div>
      )}
      {isColorOpen && (
        <div className="registration-form">
          <h2>Registrar Cores</h2>
          <div className="input-div">
            <label htmlFor="color">Cor:</label>
            <input
              onChange={(e) => setColor(e.target.value)}
              type="text"
              name="color"
              id="color"
            />
            <label htmlFor="code">Linear Gradient:</label>
            <input
              onChange={(e) => setColorCode(e.target.value)}
              type="text"
              name="code"
              id="code"
            />
          </div>
          <button
            onClick={handleRegistryColor}
            type="button"
            className="save-button"
          >
            Salvar Cor
          </button>
        </div>
      )}
    </div>
  );
};

export default SoccerBootRegistrationForm;
