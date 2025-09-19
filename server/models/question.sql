CREATE TABLE question(
    id BIGSERIAL NOT NULL,
     quizname VARCHAR(255),
     question VARCHAR(255),
     option1  VARCHAR(255),
     option2  VARCHAR(255),
     option3  VARCHAR(255),
     option4  VARCHAR(255),
     answer  VARCHAR(255),


 CONSTRAINT fk_questionmodel
            FOREIGN KEY(quizname)
                REFERENCES  quiz_name(name) ON DELETE CASCADE


)