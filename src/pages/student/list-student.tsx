import { TextInput } from "flowbite-react";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { BASE_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { Link } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";
import { CONFIG } from "../../configs";
import { ServiceHttp } from "../../services/api";
import { StudentTypes } from "../../models/student";

const StudentListView = () => {
	const [listOfStudent, setListOfStudent] = useState<any>();
	const [isLoading, setIsLoading] = useState(true);

	const fecthStudents = async () => {
		const httpService = new ServiceHttp();
		const result = await httpService.getTableData({
			url: CONFIG.base_url_api + "/students",
			pagination: true,
			page: 0,
			size: 10,
			filters: {
				search: "",
			},
		});

		setListOfStudent({
			link: "/students",
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
		fecthStudents();
	}, []);

	const header: TableHeader[] = [
		{
			title: "No",
			data: (data: StudentTypes, index: number): ReactElement => (
				<td key={index + "-no"} className="md:px-6 md:py-3 break-all">
					{index + 1}
				</td>
			),
		},

		{
			title: "Nama",
			data: (data: StudentTypes, index: number): ReactElement => (
				<td key={index + "name"} className="md:px-6 md:py-3 break-all">
					{data.studentName}
				</td>
			),
		},

		{
			title: "NIM",
			data: (data: StudentTypes, index: number): ReactElement => (
				<td key={index + "nim"} className="md:px-6 md:py-3 break-all">
					{data.studentNim}
				</td>
			),
		},

		{
			title: "email",
			data: (data: StudentTypes, index: number): ReactElement => (
				<td key={index + "email"} className="md:px-6 md:py-3 break-all">
					{data.studentEmail}
				</td>
			),
		},
		{
			title: "prodi",
			data: (data: StudentTypes, index: number): ReactElement => (
				<td key={index + "prodi"} className="md:px-6 md:py-3 break-all">
					{data.studentStudyProgramName}
				</td>
			),
		},

		{
			title: "jurusan",
			data: (data: StudentTypes, index: number): ReactElement => (
				<td key={index + "jurusan"} className="md:px-6 md:py-3 break-all">
					{data.studentDepartmentName}
				</td>
			),
		},
		{
			title: "program",
			data: (data: StudentTypes, index: number): ReactElement => (
				<td key={index + "program"} className="md:px-6 md:py-3 break-all">
					{data.mbkmProgram?.mbkmProgramName || "_"}
				</td>
			),
		},
		{
			title: "sks",
			data: (data: StudentTypes, index: number): ReactElement => (
				<td key={index + "sks"} className="md:px-6 md:py-3 break-all">
					{data.studentSksTotal || "_"}
				</td>
			),
		},
		{
			title: "Action",
			action: true,
			data: (data: StudentTypes, index: number): ReactElement => (
				<td key={index + "action"}>
					<div>
						<Link to={`/students/detail/${data.studentId}`}>
							<ButtonStyle title="Detail" color="light" />
						</Link>
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
						link: "/students",
						title: "Mahasiswa",
					},
					{
						link: "/students",
						title: "List",
					},
				]}
				icon={BASE_ICON.MENU.StudenIcon}
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
				</div>
				<div className="mt-1 w-full md:w-1/5">
					<TextInput type="text" placeholder="search..." />
				</div>
			</div>

			<TableStyle header={header} table={listOfStudent} />
		</div>
	);
};

export default StudentListView;
