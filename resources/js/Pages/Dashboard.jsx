import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Dashboard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = () => {
        const data = {
            title,
            description,
            category,
        };
        router.post("/news", data);
        setIsNotif(true);
        setTitle("");
        setDescription("");
        setCategory("");
    };

    useEffect(() => {
        if (!props.myNews) {
            router.get("/news");
        }
        console.log("propslohg ", props);
        return;
    });

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Berita Saya" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {isNotif && (
                                <div role="alert" className="alert alert-info">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="stroke-current shrink-0 w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                    <span>{props.flash.message}</span>
                                </div>
                            )}
                            <input
                                type="text"
                                placeholder="Judul"
                                className="m-2 input input-bordered w-full"
                                onChange={(title) =>
                                    setTitle(title.target.value)
                                }
                                value={title}
                            />
                            <input
                                type="text"
                                placeholder="Deskripsi"
                                className="m-2 input input-bordered w-full"
                                onChange={(description) =>
                                    setDescription(description.target.value)
                                }
                                value={description}
                            />
                            <input
                                type="text"
                                placeholder="kategori"
                                className="m-2 input input-bordered w-full"
                                onChange={(category) =>
                                    setCategory(category.target.value)
                                }
                                value={category}
                            />
                            <button
                                className="btn btn-primary m-2"
                                onClick={() => handleSubmit()}
                            >
                                SUBMIT
                            </button>
                            <div className="p-5">
                                {props.myNews && props.myNews.length > 0 ? (
                                    props.myNews.map((news, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="card w-full lg:w-96 bg-base-100 shadow-xl m-2"
                                            >
                                                <div className="card-body">
                                                    <h2 className="card-title">
                                                        {news.title}
                                                        <div className="badge badge-secondary">
                                                            NEW
                                                        </div>
                                                    </h2>
                                                    <p>{news.description}</p>
                                                    <div className="card-actions justify-end">
                                                        <div className="badge badge-inline">
                                                            {news.category}
                                                        </div>
                                                        <div className="badge badge-outline">
                                                            <Link
                                                                href={route(
                                                                    "edit.news"
                                                                )}
                                                                method="get"
                                                                data={{
                                                                    id: news.id,
                                                                }}
                                                                as="button"
                                                            >
                                                                Edit
                                                            </Link>
                                                        </div>
                                                        <div className="badge badge-outline">
                                                            <Link
                                                                href={route(
                                                                    "delete.news"
                                                                )}
                                                                method="post"
                                                                data={{
                                                                    id: news.id,
                                                                }}
                                                                as="button"
                                                            >
                                                                Delete
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="card w-96 bg-neutral text-neutral-content">
                                        <div className="card-body items-center text-center">
                                            <h2 className="card-title">
                                                Kosong!
                                            </h2>
                                            <p>
                                                Beritamu Kosong! Ayo Segera
                                                Upload!
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
