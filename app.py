from flask import Flask, render_template, request
import smtplib
import os

app = Flask(__name__)
port = int(os.environ.get("PORT", 10000))

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/submit", methods=["POST"])
def submit():
    name = request.form["name"]
    email = request.form["email"]
    phone = request.form["phone"]
    message = request.form["message"]

    # Email settings using environment variables
    sender_email = os.environ.get("EMAIL_USER")
    sender_password = os.environ.get("EMAIL_PASSWORD")
    receiver_email = "ramsriram9858@gmail.com"

    # Email content
    subject = "✉️ New Message from Your Portfolio"
    body = f"""
    Hi, you received a new message from your portfolio:

    Name: {name}
    Email: {email}
    Phone: {phone}
    Message: {message}
    """

    # Sending the email
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, f"Subject: {subject}\n\n{body}")
        return "✅ Message sent successfully!"
    except Exception as e:
        return f"❌ Failed to send message. Error: {str(e)}"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port, debug=True)
