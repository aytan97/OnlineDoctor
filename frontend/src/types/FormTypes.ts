

export interface WriteBlogFormInput {
    categoryId: string;
    title: string;
    description: string;
    image?: string;
    img?: string;
    body: string;
    status: string;
    tags?: string[];

}

export interface ProfilePicForm {
    image?: string
}


export interface FeedBackForm {
    patientId?: string | any;
    commentText?: string;
    email?: string,
    questionText?: string;
}


export interface MyProfileFormInput {
    firstname: string,
    lastname: string,
    categories?: string[],
    age?: number,
    phoneNumber?: string,
    languageSkills?: string[],
    workExperience?: string,
    currentWorkHospital?: string,
    biography?: string,
    image?: string
}
