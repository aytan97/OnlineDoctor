import { color } from "./color"


export const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'align',
    'link',
    'background',
    'color',
]


export const modules = {
    toolbar: {
        container: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ align: [] }],
            ['bold', 'italic', 'underline'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                {
                    color: color,
                },
                { background: [] },
                'link',
            ],
        ],
    },
}
