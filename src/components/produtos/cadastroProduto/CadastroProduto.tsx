import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { Produto } from "../../../models/Produto";
import { getAll, getById, post, put } from "../../../services/Service";
import { Box, FormControl } from "@mui/material";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import "./CadastroProduto.css";
import { InputNumber } from "primereact/inputnumber";
import InputMask from "react-input-mask";
import { Categoria } from "../../../models/Categoria";
import { toast } from "react-toastify";
import User from "../../../models/User";

function CadastroProduto() {
  const history = useNavigate();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  const { id } = useParams<{ id: string }>();
  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    tipo: "",
    cor: "",
    fluxo: "",
  });

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: "",
    preco: 0,
    img: "",
    descricao: "",
    data: "",
    categoria: null,
    // usuario: null
  });

  // const userId = useSelector<TokenState, TokenState['id']>(
  //   (state) => state.id
  // )

  // const [usuario, setUsuario] = useState<User>({
  //   id: +userId,
  //   nome: "",
  //   usuario: "",
  //   senha:'',
  //   foto:''
  // })

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria,
      // usuario: usuario
    });
  }, [categoria])

  function updateProduto(event: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [event.target.name]: event.target.value,
      categoria: categoria,
    });
  }
  async function getProdutoById(id: string) {
    getById(`/produtos/${id}`, setProduto, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getCategoria();
    if (id !== undefined) {
      getProdutoById(id);
    }
  }, [id]);

  async function getCategoria() {
    await getAll("/categoria", setCategorias, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (token === "") {
      toast.info("Efetue o login", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      history("/login");
    }
  }, [token]);

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    console.log(produto);
    console.log(categoria);
    event.preventDefault();
    if (id !== undefined) {
      try {
        await put("/produtos", produto, setProduto, {
          headers: {
            Authorization: token,
          },
        });
        toast.success("Produto atualizado com sucesso!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        history("/produtos");
      } catch (error) {
        toast.error("Falha ao atualizar o produto!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      try {
        await post("/produtos", produto, setProduto, {
          headers: {
            Authorization: token,
          },
        });
        toast.success("Produto cadastrado com sucesso!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        history("/produtos");
      } catch (error) {
        toast.error("Falha ao cadastrar o produto!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  }

  return (
    <>
      <div className="fundoCadProd">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} className="nomeProduto">
              <Typography
                variant="h3"
                component="h1"
                align="center"
                className="textoCP"
              >
                {produto.id !== 0 ? "Editar produto" : "Cadastrar produto"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form
                onSubmit={onSubmit}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Box className="formCadastro">
                  <TextField
                    value={produto.nome}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      updateProduto(event)
                    }
                    id="nome"
                    label="Nome"
                    variant="outlined"
                    name="nome"
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    value={produto.descricao}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      updateProduto(event)
                    }
                    id="descricao"
                    label="Descricao"
                    name="descricao"
                    variant="outlined"
                    margin="normal"
                    multiline
                    minRows={4}
                    fullWidth
                  />
                  <TextField
                    value={produto.img}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      updateProduto(event)
                    }
                    id="img"
                    label="img"
                    name="img"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  <Box display={"flex"} alignItems={"center"}>
                    R$
                    <InputMask
                      mask={"99" + "." + "99"}
                      value={produto.preco}
                      name="preco"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateProduto(e)
                      }
                      type="text"
                      alwaysShowMask
                    />
                  </Box>

                  {/* SELETOR DE CATEGORIA */}
                  <FormControl
                    variant="outlined"
                    margin="normal"
                    className="formularioCategoria"
                  >
                    <InputLabel id="demo-simple-select-helper-label">
                      Categoria
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      onChange={(event) =>
                        getById(
                          `/categoria/${event.target.value}`,
                          setCategoria,
                          {
                            headers: {
                              Authorization: token,
                            },
                          }
                        )
                      }
                    >
                      {categorias.map((categoria) => (
                        <MenuItem value={categoria.id}>
                          {categoria.tipo} {categoria.fluxo} {categoria.cor}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <div className="btnCadProd">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={categoria.id === 0}
                      onClick={() => {
                        (event: ChangeEvent<HTMLInputElement>) =>
                          updateProduto(event);
                      }}
                    >
                      {produto.id !== 0 ? "Editar" : "Cadastrar"}
                    </Button>

                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={() => history("/produtos")}
                    >
                      Cancelar
                    </Button>
                  </div>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
export default CadastroProduto;
