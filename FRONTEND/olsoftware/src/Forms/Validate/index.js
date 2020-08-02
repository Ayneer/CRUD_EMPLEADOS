export const required = value => (value ? undefined : 'Este campo es requerido');
export const validEmail = value => value && /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? undefined : `Digite un correo valido`;
export const validDigit = value => (!value || (value && !isNaN(Number(value)) && /^[0-9]+$/.test(value))) ? undefined : 'Debe digitar solo valores numericos';
export const positiveNumber = value => (!value || (value && !isNaN(Number(value)) && Number(value) > 0)) ? undefined : `Debe ingresar un valor no negativo`;
export const minLenght2 = value => (!value || (value && value.length >= 2)) ? undefined : `El tamaño de este campo es muy corto`;
export const minLength6 = value => value && value.length >= 6 ? undefined : `El tamaño de este campo es muy corto`;
export const validateID = value => value && (value.length >= 7 && value.length <= 10) ? undefined : 'Numero de identificación invalido.';
export const onlyText = value => {
    let cont = 0;
    if (value) {
        for (let index = 0; index < value.length; index++) {
            let letra = value[index];
            if (index === 0 && !/[a-zA-Z]/.test(letra)) {
                cont++;
            } else if (!/^[a-zA-Z-À-ž ]/.test(letra)) {
                cont++;
            }
        }
    }

    if (cont === 0) {
        return undefined;
    } else {
        return `Digite un texto valido, sin carácteres especiales. Aa-Zz`;
    }
}