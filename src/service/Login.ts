import ApiUrl from "../routes/ApiURL";
import axios from "axios";

class Login{

    email: string;
    senha: string;
    api: string;

    constructor(email: string, senha: string) {

        this.email = email;
        this.senha = senha;
        this.api = ApiUrl.URL + "login";
    }


    async logar(): Promise<number>{

        try {
            const response = await axios.post(this.api, {
              email: this.email,
              password: this.senha,
            });
      
            // Retorna o status da resposta
            return response.status;
          } catch (error) {
            if (axios.isAxiosError(error)) {
              // Retorna o status do erro se disponível
              return error.response ? error.response.status : 500;
            } else {
              // Retorna 500 se não for um erro do Axios
              return 500;
            }
          }
        }
    }

export default Login;