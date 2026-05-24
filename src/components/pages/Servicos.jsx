import { useState, useEffect } from 'react';
import FormularioServico from '../formularios/FormularioServico';
import TabelaServicos from '../formularios/TabelaServicos';

function Servicos() {
    const [servicos, setServicos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    // Função centralizada para carregar os dados do Back-end
    const carregarServicos = () => {
        fetch('http://localhost:8800/servicos/hoje')
            .then((res) => res.json())
            .then((data) => {
                setServicos(data);
                setCarregando(false);
            })
            .catch((err) => {
                console.error("Erro ao carregar serviços:", err);
                setCarregando(false);
            });
    };

    useEffect(() => {
        carregarServicos();
    }, []);

    return (
        <div>
            {/* Passamos a função carregarServicos para o formulário atualizar a lista quando salvar */}
            <FormularioServico onServicoAdicionado={carregarServicos} />
            
            <TabelaServicos 
                servicos={servicos} 
                setServicos={setServicos} 
                carregando={carregando} 
            />
        </div>
    );
}

export default Servicos;
