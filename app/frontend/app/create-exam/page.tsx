'use client'
import {useState} from 'react';
import {title} from "@/components/primitives";
import httpClient from "@/utils/httpClient";
import {Exam} from "@/types";
import { useRouter } from 'next/navigation'

export default function CalendarPage() {
    const router = useRouter();
    const [dropdownValue, setDropdownValue] = useState('AFN111');
    const [timestampOne, setTimestampOne] = useState(new Date());
    const [timestampTwo, setTimestampTwo] = useState(new Date());
    const [textFieldValue, setTextFieldValue] = useState('');

    // Function to handle the submit action
    const handleSubmit = async () => {
        console.log('Submitting form data');
        console.log('Dropdown value:', dropdownValue);
        const formData: Omit<Exam, 'summaryFields'>
            = {
            id: '',
            startTimestamp: timestampOne.getTime(),
            endTimestamp: timestampTwo.getTime(),
            description: textFieldValue,
            isValidated: false,
            isSubmitted: false,
        };


        // Sending the formData object as a JSON to your API endpoint
        try {
            console.log('Sending form data:', formData);
            const response = await httpClient.post<Exam>(`/modules/${dropdownValue}/exams`, formData);
            console.log('Response:', response);
            if (response.status >= 200 && response.status < 300) {
                console.log('Email sent successfully');
                // You can add additional logic or UI updates here

                 router.push('/exams');

            } else {
                console.error('Failed to send email:', response.data);
                // Handle error cases
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div id="createExam">
            <br/>
            <br/>
            <br/>
            <h1 className={title()}>Create Exam</h1>
            <br/>

            {/*TODO : Retrieve the list of codes from database*/}

            {/* Dropdown List */}
            <label htmlFor="dropdown">Select an Option: </label>
            <select id="dropdown" value={dropdownValue} onChange={e => setDropdownValue(e.target.value)}>
                <option value="AFN111">AFN111 - Computer Science</option>
                <option value="AFN112">AFN112 - Economy</option>
                <option value="AFN113">AFN113 - Statistics</option>
                <option value="AFN114">AFN114 - Communication</option>
                <option value="AFN115">AFN115 - Biology</option>
                <option value="AFN116">AFN116 - Sociology</option>
            </select>

            <br/>
            <br/>
            <br/>

            {/* Timestamp Picker 1 */}
            <label htmlFor="timestampOne">Start Time: </label>
            <input
                type="datetime-local"
                id="timestampOne"
                value={timestampOne.toISOString().substring(0, 16)}
                onChange={e => setTimestampOne(new Date(e.target.value))}
            />
            <br/>
            <br/>
            <br/>


            {/* Timestamp Picker 2 */}
            <label htmlFor="timestampTwo">End Time: </label>
            <input
                type="datetime-local"
                id="timestampTwo"
                value={timestampTwo.toISOString().substring(0, 16)}
                onChange={e => setTimestampTwo(new Date(e.target.value))}
            />
            <br/>
            <br/>
            <br/>


            {/* Text Field */}
            <label htmlFor="textField">Exam Name: </label>
            <input
                type="text"
                id="textField"
                value={textFieldValue}
                onChange={e => setTextFieldValue(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
