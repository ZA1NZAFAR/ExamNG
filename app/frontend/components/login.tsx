import { useService } from '@/hooks/useService';
import {
	ModalContent, 
	ModalHeader, 
	ModalBody,
	ModalFooter
} from '@nextui-org/modal';
import { Button } from '@nextui-org/react';

type LoginProps = {
	onSubmit(): void;
}

const Login = ({
	onSubmit
}: LoginProps) => {
	const { authService } = useService();

	const handleSubmit = (type: string) => {
		if (type === 'teacher') {
			authService.login('abc@xyz.com');
		} else if (type === 'student') {
			authService.login();
		}
		onSubmit();
	}

	return (		
		<ModalContent>
			{(onClose) => (
				<>
					<ModalHeader>Login</ModalHeader>
					<ModalBody>
						<Button onPress={() => {
							handleSubmit('teacher');
							onClose();
						}}>
							Teacher
						</Button>
						<Button onPress={() => {
							handleSubmit('student')
							onClose();
						}}>
							Student
						</Button>
					</ModalBody>
					<ModalFooter>
						<Button onPress={onClose}>Cancel</Button>
					</ModalFooter>
				</>
			)}
		</ModalContent>
	);
}

export default Login;
