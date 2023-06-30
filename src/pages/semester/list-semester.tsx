import { Badge, TextInput } from "flowbite-react";
import { ReactElement, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_ICON, BreadcrumbStyle } from "../../components";
import { ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { CONFIG } from "../../configs";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { converDateTimeFromDB } from "../../utils/convert";
import ModalStyle from "../../components/modal";
import { SemesterTypes } from "../../models/semester";

const SemesterListView = () => {
	const [listSemester, setListSemester] = useState<any>();
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const [openModalDelete, setOpenModalDelete] = useState(false);
	const [modalDeleteData, setModalDeleteData] = useState<SemesterTypes>();
	const httpService = new ServiceHttp();

	const handleModalDelete = () => {
		setOpenModalDelete(!openModalDelete);
	};

	const handleModaDataSelected = (item: SemesterTypes) => {
		setModalDeleteData(item);
	};

	const handleDeleteSemester = async () => {
		await httpService.remove({
			path: `/semesters?semester_id=${modalDeleteData?.semesterId}`,
		});
		setOpenModalDelete(false);
		window.location.reload();
	};

	const fecthData = async () => {
		const result = await httpService.getTableData({
			url: CONFIG.base_url_api + "/semesters",
			pagination: true,
			page: 0,
			size: 10,
			filters: {
				search: "",
			},
		});

		setListSemester({
			link: "/semesters",
			data: result,
			page: 0,
			size: 10,
			filter: {
				search: "",
			},
		});
		setIsLoading(false);
	};

	useEffect(() => {
		fecthData();
	}, []);

	const header: TableHeader[] = [
		{
			title: "No",
			data: (data: SemesterTypes, index: number): ReactElement => (
				<td key={index + "-no"} className="md:px-6 md:py-3 break-all">
					{index + 1}
				</td>
			),
		},

		{
			title: "Nama Semester",
			data: (data: SemesterTypes, index: number): ReactElement => (
				<td key={index + "name"} className="md:px-6 md:py-3 break-all">
					{data.semesterName}
				</td>
			),
		},

		{
			title: "Status",
			data: (data: SemesterTypes, index: number): ReactElement => {
				if (data.semesterStatus === "active") {
					return (
						<td key={index + "status"} className="md:px-6 md:py-3 break-all ">
							<Badge color="info" className="w-20 text-center">
								aktif
							</Badge>
						</td>
					);
				} else {
					return (
						<td key={index + "status"} className="md:px-6 md:py-3 break-all ">
							<Badge color="failure" className="w-20 text-center">
								tidak aktif
							</Badge>
						</td>
					);
				}
			},
		},

		{
			title: "Di buat oleh",
			data: (data: SemesterTypes, index: number): ReactElement => (
				<td key={index + "programtype"} className="md:px-6 md:py-3 break-all">
					{data.semesterCreatedBy}
				</td>
			),
		},

		{
			title: "Di buat pada",
			data: (data: SemesterTypes, index: number): ReactElement => (
				<td key={index + "created at"} className="md:px-6 md:py-3 break-all">
					{converDateTimeFromDB(data.createdOn)}
				</td>
			),
		},

		{
			title: "Action",
			action: true,
			data: (data: SemesterTypes, index: number): ReactElement => (
				<td key={index + "action"}>
					<div className="flex items-center">
						<Link to={`/semesters/detail/${data.semesterId}`}>
							<ButtonStyle title="Detail" size="xs" color="light" />
						</Link>
						<ButtonStyle
							title="Hapus"
							size="xs"
							color="failure"
							className="mx-2"
							onClick={() => {
								handleModalDelete();
								handleModaDataSelected(data);
							}}
						/>
					</div>
				</td>
			),
		},
	];

	if (isLoading) return <div>loading...</div>;

	return (
		<div className="m-5">
			<BreadcrumbStyle
				listPath={[
					{
						link: "/semesters",
						title: "Semester",
					},
					{
						link: "/semesters",
						title: "List",
					},
				]}
				icon={BASE_ICON.MENU.SemesterIcon}
			/>

			<div className="flex flex-col md:flex-row justify-between md:px-0">
				<div className="flex items-center">
					<div className="w-full mr-2 flex flex-row justify-between md:justify-start">
						<select
							name="size"
							defaultValue={10}
							className="block w-32 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
						>
							<option value="2">2</option>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>
					</div>

					<ButtonStyle
						title="Create"
						color="light"
						onClick={() => navigate("/semesters/create")}
					/>
				</div>
				<div className="mt-1 w-full md:w-1/5">
					<TextInput type="text" placeholder="search..." />
				</div>
			</div>

			<ModalStyle
				onBtnNoClick={handleModalDelete}
				title={`Apakah anda yakin ingin menghapus ${modalDeleteData?.semesterName}`}
				isOpen={openModalDelete}
				onBtnYesClick={handleDeleteSemester}
				onOpen={handleModalDelete}
			/>
			<TableStyle header={header} table={listSemester} />
		</div>
	);
};

export default SemesterListView;
