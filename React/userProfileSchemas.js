import * as Yup from 'yup';

const userProfileFormSchema = Yup.object().shape({
    firstName: Yup.string().nullable(),
    lastName: Yup.string().nullable(),
    mi: Yup.string().max(2).nullable(),
    avatarUrl: Yup.string().url().nullable(),
});

export { userProfileFormSchema };
