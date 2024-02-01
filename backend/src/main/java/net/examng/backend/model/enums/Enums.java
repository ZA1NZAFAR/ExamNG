package net.examng.backend.model.enums;

public class Enums {
    public static final String EXAMNG = "[ExamNG]";

    public static class Emails {
        public static final String EXAMNG_EMAIL = "examng0@gmail.com";
    }

    public static class EmailMessages {
        public static final String NEW_EXAM_SUBJECT = EXAMNG + " New exam for module %s";
        public static final String NEW_EXAM_BODY = "A new exam has been created for your module %s the following description: %s";

        public static final String FOOTER = "\n\nBest Regards,\nExamNG Team";

    }
}
