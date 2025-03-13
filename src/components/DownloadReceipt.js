import jsPDF from "jspdf";

const downloadReceiptPDF = (order) => {
    const doc = new jsPDF();

    // Watermark text
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(50);
    doc.text("Domino's Pizza", 35, 150, { angle: 45, opacity: 0.1 });

    // Reset color and font for normal text
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text("Domino's Pizza - ORDER RECEIPT", 20, 20);

    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 20, 30);
    doc.text(`Order Date: ${order.date}`, 20, 40);
    doc.text("----------------------------------------", 20, 50);
    doc.text("Items:", 20, 60);

    let y = 70;
    order.items.forEach(item => {
        const itemLine = `${item.name}(${item.price}/-) x${item.quantity} - Rs.${(item.price * item.quantity).toFixed(2)}`;
        doc.text(itemLine, 20, y);
        y += 10;
    });

    doc.text("----------------------------------------", 20, y);
    y += 10;

    doc.text(`Total: Rs.${order.total.toFixed(2)}`, 20, y);
    y += 10;

    doc.text("Thank you for ordering with Domino's Pizza!", 20, y);

    doc.save(`${order.id}_receipt.pdf`);
};

export default downloadReceiptPDF;
