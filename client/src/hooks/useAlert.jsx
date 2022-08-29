import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const useAlert = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [alertDetails, setAlertDetails] = useState(null);

	useEffect(() => {
		if (alertDetails) {
			const timer = setTimeout(() => {
				onClose();
			}, 2500);

			return () => clearTimeout(timer);
		}
	}, [alertDetails, onClose]);

	const setAlert = (
		status,
		message
	) => {
		setAlertDetails({
			status,
			message,
		});
		onOpen();
	};

	return {
		setAlert,
		isAlertOpen: isOpen,
		onAlertClose: onClose,
		alertDetails: alertDetails,
	};
};

export default useAlert;
