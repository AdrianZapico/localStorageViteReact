import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
} from "@chakra-ui/react";
import { useState } from "react";


const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {

    const [name, setName] = useState(dataEdit.name || "");
    const [email, setEmail] = useState(dataEdit.email || "");

    const handleSave = () => {
        if (!name || !email) return
        if (emailAlreadyExists()) {
            return alert("Email ja existe")
        }
        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = { name, email };
        }

        const newDataArray = !Object.keys(dataEdit).length
            ? [...(data ? data : []), { name, email }]
            : [...(data ? data : [])];

        localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));

        setData(newDataArray);

        onClose();
    }

    const emailAlreadyExists = () => {
        if (dataEdit.email !== email && data?.length) {
            return data.find((item) => item.email === email);
        }

        return false;
    };

    return (
        <>
            <h1>Hello</h1>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastro de Clientes</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display='flex' flexDirection='column' gap={4}>
                            <Box>
                                <FormLabel>Nome</FormLabel>
                                <Input
                                    type='text'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Box>

                        </FormControl>
                    </ModalBody>

                    <ModalFooter justifyContent='start'>
                        <Button colorScheme='green' mr={3} onClick={handleSave}>
                            Salvar
                        </Button>
                        <Button colorScheme='red' onClick={onClose}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>

    )
}

export default ModalComp
