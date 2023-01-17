import { useForm } from "react-hook-form"
import { BackBody, ContainerInput, ContainerMain } from "./style"
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCalculation } from "../../schemas"
import api from "../../service";
import { useState } from "react";

const Main = () => {
    const [calculation, setCalculation] = useState([]);
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schemaCalculation)}) 

    const onSubmit = (data) => {
     api
      .post("", { ...data })
      .then((res) => {
        setCalculation(res.data);
      })
      .catch((err) => console.log(err));
    }

    return (
        <BackBody>
        <ContainerMain>
            <section className="sectionInputs">
                <h2>Simule sua Antecipação</h2>
                <div className="divInputs">
                    <form onSubmit={handleSubmit(data => onSubmit(data))}>
                        <ContainerInput>
                            <label>Informe o valor da venda *</label>
                            <input type="text" placeholder="R$" name="amount" {...register("amount")}/>
                            <span className="pError">{errors.amount?.message}</span>

                            <label>Em quantas parcelas *</label>
                            <input type="text" name="installments" {...register("installments")}/>
                            <p>"Máximo de 12 parcelas"</p>
                            <span className="pError">{errors.installments?.message}</span>

                            <label>Informe o percentual de MDR *</label>
                            <input type="text" name="mdr" {...register("mdr")}/>
                            <span className="pError">{errors.mdr?.message}</span>

                            <button type="submit"></button>
                        </ContainerInput>
                    </form>
                </div>
            </section>
            <section className="sectionOutputs">
                <div className="divOutputs">
                    <h2 className="h2Response">VOCÊ RECEBERÁ:</h2>
                    <h3 className="h3Response">Amanhã: <strong className="h3Strong">&#160; R$ {calculation['1'] ? calculation['1'] : 0},00</strong></h3>
                    <h3 className="h3Response">Em 15 dias: <strong className="h3Strong">&#160; R$ {calculation['15'] ? calculation['15'] : 0},00</strong></h3>
                    <h3 className="h3Response">Em 30 dias: <strong className="h3Strong">&#160; R$ {calculation['30'] ? calculation['30'] : 0},00</strong></h3>
                    <h3 className="h3Response">Em 90 dias: <strong className="h3Strong">&#160; R$ {calculation['90'] ? calculation['90'] : 0},00</strong></h3>
                </div>
            </section>
        </ContainerMain>
        </BackBody>
    )
}

export default Main