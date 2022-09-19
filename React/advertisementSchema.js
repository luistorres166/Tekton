import * as Yup from 'yup';

const locationFormSchema = Yup.object().shape({
    entityId: Yup.number().required('Is Required'),
    entityTypeId: Yup.number().min(1).max(4).required('Is Required'),
    title: Yup.string().min().max(100).nullable(),
    adMainImage: Yup.string().nullable(),
    details: Yup.string().nullable(),
    dateStart: Yup.date().min(new Date()).isRequired(),
    dateEnd: Yup.date().min(Yup.ref('dateStart'), 'end date must be after start date').isRequired(),
});

export default locationFormSchema;
