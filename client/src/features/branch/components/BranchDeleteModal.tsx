import { useBranchContext } from "../contexts/BranchContext";
import { Button, Flex, Modal, Text } from "@mantine/core";
import { useLocation, useNavigate } from "react-router";

const BranchDeleteModal = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const {
		deleteIds,
		isOpenDeleteModal,
		setIsOpenDeleteModal,
		destroy,
		search,
	} = useBranchContext();

	const handleDelete = async () => {
		try {
			await destroy(deleteIds);
			setIsOpenDeleteModal(false);
			if (location.pathname !== "/branches") {
				navigate("/branches");
			} else {
				search();
			}
		} catch (error) {}
	};

	return (
		<Modal
			opened={isOpenDeleteModal}
			onClose={() => setIsOpenDeleteModal(false)}
			title="Confirm Delete"
			centered
			size={"xs"}
			style={{ color: "var(--mantine-color-myColor-9)" }}
		>
			<Text>Are you sure you want to delete selected branches?</Text>
			<Flex justify={"space-between"} mt={"sm"}>
				<Button
					variant="light"
					color="gray"
					onClick={() => setIsOpenDeleteModal(false)}
				>
					Close
				</Button>
				<Button color="red" onClick={handleDelete}>
					Delete
				</Button>
			</Flex>
		</Modal>
	);
};

export default BranchDeleteModal;
