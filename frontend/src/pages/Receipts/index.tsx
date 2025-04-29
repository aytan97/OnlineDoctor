import jsPDF from 'jspdf';
import logo2 from '../../shared/media/images/logo2.png'
import woltLogo from '../../shared/media/images/woltlogo.jpg'
import logoicon from '../../shared/media/images/logoicon.png'
import { Helmet } from 'react-helmet-async';

const prescriptions = [
    {
        "id": "1",
        "doctorId": "Mehmet Oz",
        "patientid": "John Doe",
        "dosage": "2",
        "items": ["Everyday"],
        "name": ["Advil, Motrin - Ibuprofen", "Test", "Best"],
        "timeofday": ["Noon"],
        "toBeTakenItems": ["After Food"],
        "createdAt": "2024-05-10"
    },
    {
        "id": "1",
        "doctorId": "Mehmet Oz",
        "patientid": "John Doe",
        "dosage": "1",
        "items": ["Alternatve"],
        "name": ["Test"],
        "timeofday": ["Noon", "Night"],
        "toBeTakenItems": ["Before Food"],
        "createdAt": "2024-05-13"
    },
    {
        "id": "2",
        "doctorId": "Mehmet Oz",
        "patientid": "John Doe",
        "dosage": "1",
        "items": ["Alternatve"],
        "name": ["Test"],
        "timeofday": ["Noon", "Night"],
        "toBeTakenItems": ["Before Food"],
        "createdAt": "2024-05-10"
    },
    {
        "id": "3",
        "doctorId": "Sanjay Gupta",
        "patientid": "John Doe",
        "dosage": "3",
        "items": ["Everyday"],
        "name": ["Test"],
        "timeofday": ["Noon", "Night"],
        "toBeTakenItems": ["Before Food"],
        "createdAt": "2024-05-10"
    }
];

const MyReceipts = () => {

    const downloadPrescriptions = (prescriptions: any) => {
        const doc = new jsPDF();

        doc.setFont('helvetica');
        doc.setFontSize(12);
        const imgData = logo2;

        const styles = {
            lineHeight: 10,
            marginLeft: 10,
            marginRight: 10,
            color: '#333333',
        };

        let yPos = 20;
        doc.addImage(imgData, 'PNG', 10, 10, 50, 30);
        yPos += 35;

        prescriptions.forEach((prescription: any, index: any) => {

            doc.setTextColor(styles.color);
            doc.setFont('bold');

            doc.setFont('normal');

            doc.text(`Patient ID: ${prescription.doctorId} `, styles.marginLeft, yPos);
            yPos += styles.lineHeight;

            doc.text(`Patient ID: ${prescription.patientid} `, styles.marginLeft, yPos);
            yPos += styles.lineHeight;

            doc.text(`Dosage: ${prescription.dosage}`, styles.marginLeft, yPos);
            yPos += styles.lineHeight;

            prescription.name.forEach((name: any, i: any) => {
                doc.text(`Drug Name: ${prescription.name[i]}`, styles.marginLeft, yPos);
                yPos += 5;
            });

            prescription.items.forEach((item: any, i: any) => {
                doc.text(`Items: ${prescription.items[i]}`, styles.marginLeft, yPos + 10);
                yPos += 5;
            });

            prescription.timeofday.forEach((timeofday: any, i: any) => {
                doc.text(`Time of Day: ${prescription.timeofday[i]}`, styles.marginLeft, yPos + 15);
                yPos += 5;
            });

            prescription.toBeTakenItems.forEach((toBeTakenItems: any, i: any) => {
                doc.text(`To Be Taken Items: ${prescription.toBeTakenItems[i]}`, styles.marginLeft, yPos + 20);
                yPos += 25;
            });
            yPos += 5;
            doc.line(10, yPos, 200, yPos);
            yPos += styles.lineHeight;
        });

        doc.save('prescriptions.pdf');
    };

    const filterUniquePrescriptions = () => {
        const uniquePrescriptions = prescriptions.reduce((acc, prescription) => {
            const existingPrescription = acc.find((item: any) => item.doctorId === prescription.doctorId && item.createdAt === prescription.createdAt);
            if (!existingPrescription) {
                acc.push(prescription);
            }
            return acc;
        }, []);
        return uniquePrescriptions;
    };

    // Function to handle download click
    const handleDownloadClick = (doctorId: string, createdAt: any) => {
        const filteredPrescriptions = prescriptions.filter(prescription => prescription.doctorId === doctorId && prescription.createdAt === createdAt);
        downloadPrescriptions(filteredPrescriptions);
    };

    return (
        <>
            <Helmet>
                <title>Receipts</title>
                <link rel="icon" href={logoicon} />
            </Helmet>
            <div className='container'>
                <div className="prescriptions">
                    <div className='d-flex  align-items-center justify-space-between mt-3 mb-3'>
                        <h1>Prescriptions</h1>
                        <a href="https://wolt.com/en/aze/baku/stores?filters=primary%3Dpharmacy&sorting=recommended" className='d-flex align-items-center' style={{ textDecoration: 'none', color: 'black' }}>
                            <span className='order-now-display'>Order now!</span>  <img src={woltLogo} alt="" style={{ width: '70px' }} />
                        </a>
                    </div>
                    <div className='receipts-container'>
                        {filterUniquePrescriptions().map((item: any, index) => (
                            <div key={index} className='reseipt-item'>
                                <div className='createdate'>{item?.createdAt}</div>
                                <div className='doctor'>{item.doctorId}</div>
                                <div onClick={() => handleDownloadClick(item.doctorId, item.createdAt)} className='download-btn'>
                                    <i className="fa-solid fa-download"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyReceipts;
