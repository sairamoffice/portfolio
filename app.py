from flask import Flask, render_template, request, jsonify  # Add jsonify
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

    # ✅ Update your email and App Password here
    sender_email = "ramsriram9858@gmail.com"  # Replace with your email
    sender_password = "dtwo uitd qvqo bwat"  # Replace with your Google App Password
    receiver_email = "ramsriram9858@gmail.com"  # Change if needed

    subject = "New Message from Your  sri sai ram Portfolio"
    body = f"""
    Hi, you received a new message from your portfolio:

    Name: {name}
    Email: {email}
    Phone: {phone}
    Message: {message}
    """

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.ehlo()  # Optional, identifies with the server
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, f"Subject: {subject}\n\n{body}")
        
        return jsonify({"success": True, "message": "Message sent successfully!"})  # Return JSON
    except Exception as e:
        return jsonify({"success": False, "message": f"Failed to send message. Error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port, debug=True)
