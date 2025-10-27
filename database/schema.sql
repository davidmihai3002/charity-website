CREATE TABLE Users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    age VARCHAR(3),
    email VARCHAR(255),
    password VARCHAR(255)
)

CREATE TABLE Donations (
    id INT AUTO_INCREMENT,
    user_id INT,
    amount INT,
    donated_at TIME,
    donation_type VARCHAR(100)
   )