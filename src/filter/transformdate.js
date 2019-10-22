export default function (num) {
    const date = new Date(num * 1000);
    const content = ':'
    const years = `${date.getFullYear()}-`;
    const month = `${date.getMonth() + 1}-`;
    const day = `${date.getDate()} `;
    const hours = `${date.getHours()}`;
    const minutes = `${date.getMinutes()}`

    const Newdate = years + month + day + hours + content + minutes;
    return Newdate;
}